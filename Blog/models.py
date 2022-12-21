from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

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

class MPTTMeta:
    level_attr = 'mptt_level'
    order_insertion_by = ['name']

class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)

class PostBlog(models.Model):
    title = models.CharField(max_length=100)
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
    tags = models.ManyToManyField(Tag, related_name="post")

class ExpandPost(models.Model):
    title = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        Category,
        related_name="post",
        on_delete=models.SET_NULL,
        null=True
    )
    textblog = models.TextField()
    url = models.URLField(blank=True)

class RecentPosts(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Blog/images/')
    post = models.ForeignKey(
        PostBlog,
        related_name="recentposts",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )