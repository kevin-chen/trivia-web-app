from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from trivia.forms import CategoryForm
import requests

def home(request):
    req = 'http://jservice.io/api/random?count=10'
    response = requests.get(req)
    trivia_set = response.json()
    content = []
    for trivia in trivia_set:
        dict = { 'id': trivia['id'], 'question' : trivia['question'], 'answer' : trivia['answer'] }
        content.append(dict)
    return render(request, 'trivia/home.html', {'trivia' : content})

def search(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data
            print(text['category'])
            return HttpResponseRedirect('/')
    else:
        form = CategoryForm()
    return render(request, 'trivia/search.html', {'form': form})

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