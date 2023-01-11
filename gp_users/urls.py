from django.template.defaulttags import url
from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('api/v1/gp-auth/', include('rest_framework.urls')),
    # class ExpandPost
    path('api/v1/ep/', ExpandPostAPIList.as_view()),
    path('api/v1/ep/<int:pk>/', ExpandPostAPIUpdate.as_view()),
    path('api/v1/epdelete/<int:pk>', ExpandPostAPIDestaroy.as_view()),
    # class BlogPost
    path('api/v1/bp/', BlogPostAPIList.as_view()),
    path('api/v1/bp/<int:pk>/', BlogPostAPIUpdate.as_view()),
    path('api/v1/bpdelete/<int:pk>', BlogPostAPIDestaroy.as_view()),

    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/register/', RegisterView.as_view(), name='auth_register'),
]