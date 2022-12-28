from  ckeditor.fields import RichTextField
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.urls import reverse

class Category(MPTTModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    parent = TreeForeignKey(
        'self',
        related_name="children",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

class MPTTMeta:
    level_attr = 'mptt_level'
    order_insertion_by = ['name']

class PostBlog(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=250)
    category = models.ForeignKey(
        Category,
        related_name="post",
        on_delete=models.SET_NULL,
        null=True
    )
    image = models.ImageField(upload_to='Blog/images/')
    url = models.URLField(blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=200, default="")
    textblog = models.TextField(blank=True)

    def get_absolute_url(self):
        return reverse("postblog_single", kwargs={"slug":self.category.slug, "postblog_slug": self.slug})

    def get_recipes(self):
        return self.expandpostblog.all()

class ExpandPost(models.Model):
    name = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        Category,
        related_name="expandpost",
        on_delete=models.SET_NULL,
        null=True
    )
    postblog = models.ForeignKey(
        PostBlog,
        related_name="expandpostblog",
        on_delete=models.SET_NULL,
        null=True
    )
    image = models.ImageField(upload_to='Blog/images/', blank=True)
    textblog = RichTextField()
    url = models.URLField(blank=True)

class RecentPosts(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Blog/images/')
    post = models.ForeignKey(
        PostBlog,
        related_name="recentposts",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )