from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views.generic import CreateView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response


from .serializers import RegisterSerializer
from forms import AddPostBlogForm, AddExpandPostForm

class RegisterView(generics.CreateAPIView):
    renderer_classes = [TemplateHTMLRenderer]
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer
    template_name = "gp_users/register_users-gp.html"

    def get(self, request):
        queryset = User.objects.all()
        return Response({'register_view':queryset})

# class PostBlog
class AddPostBlog(CreateView):
    form_class = AddPostBlogForm
    template_name = "blog/blogpost_edited/blogpost_create.html"
    success_url = reverse_lazy('blogpost_create')
    permission_classes = (IsAuthenticatedOrReadOnly,)

# class ExpandPost
class AddExpandPost(CreateView):
    form_class = AddExpandPostForm
    template_name = "blog/blogpost_edited/expandpost_create.html."
    success_url = reverse_lazy('expandpost_create')
    permission_classes = (IsAuthenticatedOrReadOnly,)