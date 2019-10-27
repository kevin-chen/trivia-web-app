from django import forms

class CategoryForm(forms.Form):
    DIFFICULTY_CHOICES = [
        (None, 'Choose a Level'),
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard')
    ]
    YEARS = [i for i in range(1965, 2012)]

    # category is the dictionary name and the form variable name
    difficulty = forms.CharField(label='Difficulty Level', widget=forms.Select(choices=DIFFICULTY_CHOICES), required=False)
    from_date = forms.DateField(label='From ', widget=forms.SelectDateWidget(years=YEARS, empty_label=("Year", "Month", "Day")), required=False)
    to_date = forms.DateField(label='To ', widget=forms.SelectDateWidget(years=YEARS, empty_label=("Year", "Month", "Day")), required=False)
    category = forms.CharField(label='', max_length=100, required=False, widget=forms.TextInput(attrs={'placeholder' : 'Category', 'style' : 'border-radius: 15px', 'id' : 'category_form'}))