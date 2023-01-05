from django.urls import path
from . import views

urlpatterns = [
    path('auth/regester', views.GPUserList.as_view()),
]