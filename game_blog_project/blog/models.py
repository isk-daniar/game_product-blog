from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.urls import reverse
from django.contrib.auth.models import User
from django_editorjs_fields import EditorJsJSONField

class MPTTMeta:
    level_attr = 'mptt_level'
    order_insertion_by = ['name']

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

    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})

    def __str__(self):
        return self.name


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
    create_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=200, default="")
    user = models.ForeignKey(User, verbose_name='Users', on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse("postblog_single", kwargs={"slug":self.category.slug, "postblog_slug": self.slug})

    def get_recipes(self):
        return self.expandpostblog.all()

    def __str__(self):
        return self.name

class ExpandPost(models.Model):
    name = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=200, default="")
    postblog = models.ForeignKey(
        PostBlog,
        related_name="expandpostblog",
        on_delete=models.SET_NULL,
        null=True
    )
    body_editorjs = EditorJsJSONField(readOnly=False, autofocus=True, default="")

    def get_absolute_url(self):
        return reverse('expandpost', kwargs={'ep_slug': self.slug})

    def __str__(self):
        return self.name