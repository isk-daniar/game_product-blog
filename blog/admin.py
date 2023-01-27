from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from . import models


class ExpandInline(admin.StackedInline):
    model = models.ExpandPost
    extra = 1

@admin.register(models.PostBlog)
class PostAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "create_at"]
    inlines = [ExpandInline]

@admin.register(models.ExpandPost)
class ExpandPostAdmin(admin.ModelAdmin):
    list_display = ["name", "create_at"]



admin.site.register(models.Category, MPTTModelAdmin)
admin.site.register(models.RecentPosts)