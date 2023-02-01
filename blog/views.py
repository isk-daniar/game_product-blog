from django.core.files.storage import FileSystemStorage
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import ListView, DetailView, CreateView

from .models import PostBlog, Category, PostText
from forms import TestForm

class HomeView(ListView):
    model = PostBlog
    paginate_by = 10
    template_name = "blog/home.html"


class  PostListView(ListView):
    model = PostBlog

    def get_queryset(self):
        return PostBlog.objects.filter(category__slug=self.kwargs.get("slug")).select_related()

class PostDetailView(DetailView):
    model = PostBlog
    context_object_name = "postblog"
    slug_url_kwarg = 'postblog_slug'

class BlogCategory(ListView):
    model = Category
    template_name = "blog/list_categories.html"




class PostUpdate(View):
    def get(self, request, pk):
        post = PostText.objects.get(id=pk)
        bound_form = TestForm(instance=post)
        return render(request, 'blog/blogpost_edited/post_update.html', {'form': bound_form, 'post': post})

    def post(self, request, pk):
        post = PostText.objects.get(id=pk)
        bound_form = TestForm(request.POST, instance=post)

        if bound_form.is_valid():
            new_post = bound_form.save()
            return redirect(new_post)
        return render(request, 'blog/blogpost_edited/post_update.html', {'form': bound_form, 'post': post})


class PostView(View):
    def get(self, request, pk):
        post = PostText.objects.get(id=pk)
        return render(request, 'blog/blogpost_edited/post_view.html', {'post': post})

