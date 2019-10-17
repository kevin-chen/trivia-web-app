from django import forms

class CategoryForm(forms.Form):
    # category is the dictionary name and the form variable name
    category = forms.CharField(label='Category', max_length=100)