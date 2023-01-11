from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .serializers import GPSerializerPostBlog, RegisterSerializer, GPSerializerExpandPost
from Blog.models import PostBlog, ExpandPost


class RegisterView(generics.CreateAPIView):
    renderer_classes = [TemplateHTMLRenderer]
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer
    template_name = "gp_users/profile_detail.html"
    context_object_name = "register_view"

    def get(self, request):
        queryset = User.objects.all()
        return Response({'register_view':queryset})

# class BlogPost
class BlogPostAPIList(generics.ListCreateAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPSerializerPostBlog
    permission_classes = (IsAuthenticatedOrReadOnly, )

class BlogPostAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPSerializerPostBlog
    permission_classes = (IsAuthenticated, )

class BlogPostAPIDestaroy(generics.RetrieveDestroyAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPSerializerPostBlog
    permission_classes = (IsAdminOrReadOnly, )


# class ExpandPost
class ExpandPostAPIList(generics.ListCreateAPIView):
    queryset = ExpandPost.objects.all()
    serializer_class = GPSerializerExpandPost
    permission_classes = (IsAuthenticatedOrReadOnly, )

class ExpandPostAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = ExpandPost.objects.all()
    serializer_class = GPSerializerExpandPost
    permission_classes = (IsAuthenticated, )

class ExpandPostAPIDestaroy(generics.RetrieveDestroyAPIView):
    queryset = ExpandPost.objects.all()
    serializer_class = GPSerializerExpandPost
    permission_classes = (IsAdminOrReadOnly, )