from django.shortcuts import render
from .models import GPUserConf
from .serializers import GPUserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

class GPUserList(generics.ListAPIView):
    queryset = GPUserConf.objects.all()
    serializer_class = GPUserSerializer
    permission_classes = [IsAdminUser]