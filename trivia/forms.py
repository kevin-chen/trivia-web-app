from django import forms

class CategoryForm(forms.Form):
    FRUIT_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard')
    ]
    YEARS = [i for i in range(1965, 2012)]

    # category is the dictionary name and the form variable name
    category = forms.CharField(label='', max_length=100, required=False, widget=forms.TextInput(attrs={'placeholder': 'Category'}))
    difficulty = forms.CharField(label='Difficulty Level', widget=forms.Select(choices=FRUIT_CHOICES))
    from_date = forms.DateField(label='From ', widget=forms.SelectDateWidget(years=YEARS, empty_label=("Year", "Month", "Day")), required=False)
    to_date = forms.DateField(label='To ', widget=forms.SelectDateWidget(years=YEARS, empty_label=("Year", "Month", "Day")), required=False)