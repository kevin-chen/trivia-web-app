from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import urllib.request, json
from trivia.forms import CategoryForm

# posts = [{'a':4}, {'b':3}, {'c':2}]

# Create your views here.
def home(request):
    form = CategoryForm()
    return render(request, 'trivia/home.html', {'form':form})

def get_name(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data
            print(text)
            return HttpResponseRedirect('/')
            # without this statement, the url would stay on http://127.0.0.1:8000/category because the post request was rerouted to /category
    else:
        form = CategoryForm()
    return render(request, 'trivia/home.html', {'form': form})

def random(request):
    # context = {'posts':posts, 'title':'Hello'}
    # return render(request, 'trivia/random.html', context)
    req = 'http://jservice.io/api/random'
    response = urllib.request.urlopen(req).read()
    random_trivia = json.loads(response.decode('utf-8'))[0]
    # return HttpResponse(random_trivia)
    title = random_trivia['category']['title']
    context = {'question': random_trivia['question'],
               'answer': random_trivia['answer'],
               'title': title}
    return render(request, 'trivia/random.html', context)