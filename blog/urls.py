from django.urls import path
from . import views


urlpatterns = [
    path('<slug:slug>/<slug:postblog_slug>/', views.PostDetailView.as_view(), name="postblog_single"),
    path('<slug:slug>/', views.PostListView.as_view(), name="postblog_list"),
    path('<slug:cat_slug>/', views.BlogCategory.as_view(), name='category'),
    path('', views.HomeView.as_view(), name="home"),

    # Сreating a blog
    path('api/v1/blogmenu/', views.BlogCreateView.as_view(), name='blog_menu'),
    # class ExpandPost
    path('api/v1/ep/', views.ExpandPostCreateView.as_view(), name='expandpost_create'),
    # path('api/v1/ep/<int:pk>/', ExpandPostAPIUpdate.as_view()),
    # path('api/v1/epdelete/<int:pk>', ExpandPostAPIDestaroy.as_view()),


]