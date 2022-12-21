from django.shortcuts import render
from .models import PostBlog

def home(request):
    postblog = PostBlog.objects.all()
    return render(request, 'Blog/home.html', {'postblog':postblog})
