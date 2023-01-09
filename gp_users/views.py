from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny

from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .serializers import GPUserSerializer, RegisterSerializer
from Blog.models import PostBlog


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer


class GPAPIList(generics.ListCreateAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPUserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class GPAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPUserSerializer
    permission_classes = (IsAuthenticated, )

class GPAPIDestaroy(generics.RetrieveDestroyAPIView):
    queryset = PostBlog.objects.all()
    serializer_class = GPUserSerializer
    permission_classes = (IsAdminOrReadOnly, )

