from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from trivia.forms import CategoryForm
import requests

def home(request):
    req = 'http://jservice.io/api/random?count=12'
    response = requests.get(req)
    trivia_set = response.json()
    content = []
    for trivia in trivia_set:
        dict = { 'id': trivia['id'], 'question' : trivia['question'], 'answer' : trivia['answer'], 'category' : trivia['category']['title'] }
        content.append(dict)
    return render(request, 'trivia/home.html', {'trivia' : content})

def search(request):
    # Search Box
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data
            print(text['category'])
            return HttpResponseRedirect('/search')
    else:
        form = CategoryForm()

    # Category List
    req = "http://jservice.io/api/categories?count=100"
    response = requests.get(req)
    category_set = response.json()
    content = []
    for category in category_set:
        dict = {'title': category['title']}
        content.append(dict)
    return render(request, 'trivia/search.html', {'form': form, 'categories' : content, 'success' : True})

def random(request):
    req = 'http://jservice.io/api/random'
    response = requests.get(req)
    random_trivia = response.json()[0]
    title = random_trivia['category']['title']
    context = {'question': random_trivia['question'],
               'answer': random_trivia['answer'],
               'title': title,
               'success': True}
    return render(request, 'trivia/random.html', context)