from django.shortcuts import render
from django.http import HttpResponse
import urllib.request, json

posts = [{'a':4}, {'b':3}, {'c':2}]

# Create your views here.
def home(request):
    req = 'http://jservice.io/api/random'
    response = urllib.request.urlopen(req).read()
    random_trivia = json.loads(response.decode('utf-8'))[0]
    # return HttpResponse(random_trivia)
    title = random_trivia['category']['title']
    context = {'question' : random_trivia['question'],
               'answer' : random_trivia['answer'],
               'title' : title}
    return render(request, 'trivia/home.html', context)

def about(request):
    context = {'posts':posts, 'title':'Hello'}
    return render(request, 'trivia/about.html', context)