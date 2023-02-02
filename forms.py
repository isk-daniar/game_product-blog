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
        fields = ['name', 'postblog', 'textblog','body_editorjs']
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
            'body_textfield': EditorJsWidget(plugins=[
                "@editorjs/image",
                "@editorjs/header"
            ], config={'minHeight': 100})
        }

class TestForm(forms.ModelForm):
    class Meta:
        model = PostText
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
            'body_textfield': EditorJsWidget(plugins=[
                "@editorjs/image",
                "@editorjs/header"
            ], config={'minHeight': 100})
        }
