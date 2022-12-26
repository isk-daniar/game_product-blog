from django.shortcuts import render
from django.views.generic import ListView

from .models import PostBlog


class  PostListView(ListView):
    model = PostBlog

    def get_queryset(self):
        return PostBlog.objects.filter(category__slug=self.kwargs.get("slug"))

def home(request):
    return render(request, '../templates/base.html')
