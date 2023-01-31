from django.contrib.auth import views
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .views import *


app_name = 'gp_users'
urlpatterns = [
    path('api/v1/auth/', include('rest_framework.urls')),
    # class ExpandPost
    path('api/v1/ep/', AddExpandPost.as_view(), name='expandpost_create'),
    # path('api/v1/ep/<int:pk>/', ExpandPostAPIUpdate.as_view()),
    # path('api/v1/epdelete/<int:pk>', ExpandPostAPIDestaroy.as_view()),

    # class BlogPost
    path('api/v1/bp/', AddPostBlog.as_view(), name='blogpost_create'),
    # path('api/v1/bp/<int:pk>/', BlogPostAPIUpdate.as_view()),
    # path('api/v1/bpdelete/<int:pk>', BlogPostAPIDestaroy.as_view()),

    # class auth
    path('api/v1/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/v1/auth/gp_login/', views.LoginView.as_view(template_name='gp_users/login_users-gp.html'), name='auth_login'),
    path('api/v1/auth/gp_logout/', views.LogoutView.as_view(), name='auth_logout'),
]