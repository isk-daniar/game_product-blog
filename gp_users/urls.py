from django.template.defaulttags import url
from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('api/v1/gp-auth/', include('rest_framework.urls')),
    path('api/v1/gp/', GPAPIList.as_view()),
    path('api/v1/gp/<int:pk>/', GPAPIUpdate.as_view()),
    path('api/v1/gpdelete/<int:pk>', GPAPIDestaroy.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/register/', RegisterView.as_view(), name='auth_register'),
]