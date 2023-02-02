from django import forms
from django_editorjs_fields import EditorJsWidget

from blog.models import *

class AddPostBlogForm(forms.ModelForm):

    class Meta:
        model = PostBlog
        fields = ['name', 'slug', 'description', 'image', 'category']



class AddExpandPostForm(forms.ModelForm):

    class Meta:
        model = ExpandPost
        fields = ['name', 'postblog', 'body_editorjs']
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
        }