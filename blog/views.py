from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView

from .models import PostBlog, Category
from forms import AddPostBlogForm, AddExpandPostForm


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

class BlogMenuView(ListView):
    model = PostBlog
    template_name = "blog/blogpost_edited/blog_create_menu.html"

# class PostBlog
class AddPostBlog(CreateView):
    form_class = AddPostBlogForm
    template_name = "blog/blogpost_edited/blogpost_create.html"
    success_url = reverse_lazy('blogpost_create')
    exclude = ['user']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

# class ExpandPost
class AddExpandPost(CreateView):
    form_class = AddExpandPostForm
    template_name = "blog/blogpost_edited/expandpost_create.html."
    success_url = reverse_lazy('expandpost_create')


