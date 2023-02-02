from django.urls import path, include
from . import views


urlpatterns = [
    path('<slug:slug>/<slug:postblog_slug>/', views.PostDetailView.as_view(), name="postblog_single"),
    path('<slug:slug>/', views.PostListView.as_view(), name="postblog_list"),
    path('<slug:cat_slug>/', views.BlogCategory.as_view(), name='category'),
    path('', views.HomeView.as_view(), name="home"),
]