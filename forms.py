from django import forms
from django_editorjs_fields import EditorJsWidget

from blog.models import *


class AddPostBlogForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].empty_label = "Category not selected"

    class Meta:
        model = PostBlog
        fields = ['name', 'slug', 'description', 'image', 'category']
        widgets = {
            'name': forms.TextInput(attrs={'width': 380}),
        }



class AddExpandPostForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['postblog'].empty_label = "No blog selected"
        self.fields['name'].empty_label = "No blog selected"

    class Meta:
        model = ExpandPost
        fields = ['name', 'postblog', 'body_editorjs']
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
            'name': forms.TextInput(attrs={'class': 'form-input'}),
        }