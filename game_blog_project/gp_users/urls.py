from django.contrib.auth import views
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .views import *


app_name = 'gp_users'
urlpatterns = [
    path('api/v1/auth/', include('rest_framework.urls')),


    # class auth
    path('api/v1/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/v1/auth/gp_login/', views.LoginView.as_view(template_name='gp_users/login_users-gp.html'), name='auth_login'),
    path('api/v1/auth/gp_logout/', views.LogoutView.as_view(), name='auth_logout'),
]