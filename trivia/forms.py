from django import forms

class CategoryForm(forms.Form):
    # category is the dictionary name and the form variable name
    category = forms.CharField(label='', max_length=100, required=False)
    #time = # FIX THIS ADD TIME Field dropdown
    #difficulty = # FIX THIS DIFFICULTY TIME Field dropdown