from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from . import models


class ExpandInline(admin.StackedInline):
    model = models.ExpandPost
    extra = 1

@admin.register(models.PostBlog)
class PostAdmin(admin.ModelAdmin):
    list_display = ["name", "user", "category", "create_at"]
    inlines = [ExpandInline]

@admin.register(models.ExpandPost)
class ExpandPostAdmin(admin.ModelAdmin):
    list_display = ["name", "create_at"]

@admin.register(models.Category)
class CategoreAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
