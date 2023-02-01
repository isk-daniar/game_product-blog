from django.urls import path, include
from . import views


urlpatterns = [
    path('<slug:slug>/<slug:postblog_slug>/', views.PostDetailView.as_view(), name="postblog_single"),
    path('<slug:slug>/', views.PostListView.as_view(), name="postblog_list"),
    path('<slug:cat_slug>/', views.BlogCategory.as_view(), name='category'),
    path('api/v1/posts/<int:pk>/edit', views.PostUpdate.as_view(), name='post_edit'),
    path('api/v1/posts/<int:pk>', views.PostView.as_view(), name='post_detail'),
    path('api/v1/posts/cor/', views.PostCr.as_view(), name='post_c'),
    path('', views.HomeView.as_view(), name="home"),
]