from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response

from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    renderer_classes = [TemplateHTMLRenderer]
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer
    template_name = "gp_users/register_users-gp.html"

    def get(self, request):
        queryset = User.objects.all()
        return Response({'register_view':queryset})
