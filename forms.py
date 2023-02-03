from django import forms
from django_editorjs_fields import EditorJsWidget

from gp_users.serializers import SerializerPostBlog
from blog.models import *

class AddPostBlogForm(forms.ModelForm):
    user = SerializerPostBlog
    class Meta:
        model = PostBlog
        fields = ['image', 'name', 'slug', 'description',  'category', 'user']



class AddExpandPostForm(forms.ModelForm):

    class Meta:
        model = ExpandPost
        fields = ['name', 'postblog', 'body_editorjs']
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
        }