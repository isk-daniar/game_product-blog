from django.urls import path
from . import views

urlpatterns = [
    path('<slug:slug>/<slug:postblog_slug>/', views.PostDetailView.as_view(), name="postblog_single"),
    path('<slug:slug>/', views.PostListView.as_view(), name="postblog_list"),
    path('', views.home),
]