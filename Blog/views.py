from django.shortcuts import render
from django.views.generic import ListView, DetailView

from .models import PostBlog, Category


class HomeView(ListView):
    model = PostBlog
    paginate_by = 5
    template_name = "blog/home.html"


class  PostListView(ListView):
    model = PostBlog

    def get_queryset(self):
        return PostBlog.objects.filter(category__slug=self.kwargs.get("slug")).select_related()

class PostDetailView(DetailView):
    model = PostBlog
    context_object_name = "postblog"
    slug_url_kwarg = 'postblog_slug'

def show_category(request, cat_slug):

    posts = Category.objects.filter(cat_slug=cat_slug)

    dict = {
        'name':'name',
        'posts':posts,
        'cat_selected':cat_slug
    }

    return  render(request, '/templates/Blog/include/blog_post_category.html', context=dict)