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



class AddExpandPostForm(forms.ModelForm):

    class Meta:
        model = ExpandPost
        fields = ['name', 'postblog', 'body_editorjs']
        exclude = []
        widgets = {
            'body_editorjs': EditorJsWidget(config={'minHeight': 100}),
            'name': forms.TextInput(attrs={'class': 'form-input'}),
        }