from django import forms
from blog.models import *

class AddPostBlogForm(forms.ModelForm):

    class Meta:
        model = PostBlog
        fields = ['name', 'slug', 'description', 'image', 'category']



class AddExpandPostForm(forms.ModelForm):

    class Meta:
        model = ExpandPost
        fields = ['name', 'postblog', 'textblog']