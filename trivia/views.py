from django.shortcuts import render
from django.http import HttpResponse
import urllib.request, json

posts = [{'a':4}, {'b':3}, {'c':2}]

# Create your views here.
def home(request):
    # request = 'http://jservice.io/api/random'
    # response = urllib.request.urlopen(request).read()
    # random_trivia = json.loads(response.decode('utf-8'))
    # return HttpResponse(random_trivia)
    return render(request, 'trivia/home.html')

def about(request):
    context = {'posts':posts, 'title':'About'}
    return render(request, 'trivia/about.html', context)