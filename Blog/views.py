from django.shortcuts import render
from django.views.generic import ListView, DetailView

from .models import PostBlog


class  PostListView(ListView):
    model = PostBlog

    def get_queryset(self):
        return PostBlog.objects.filter(category__slug=self.kwargs.get("slug")).select_related()

class PostDetailView(DetailView):
    model = PostBlog
    context_object_name = "postblog"
    slug_url_kwarg = 'postblog_slug'

def home(request):
    return render(request, '../templates/base.html')
