from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from trivia.forms import CategoryForm
import requests
import random as ran
import re

TAG_RE = re.compile(r'<[^>]+>')
# dance for me
def home(request):
    req = 'http://jservice.io/api/random?count=12'
    response = requests.get(req)
    trivia_set = response.json()
    content = []
    for trivia in trivia_set:
        dict = { 'id': trivia['id'], 'question' : trivia['question'], 'answer' : TAG_RE.sub('', trivia['answer']), 'category' : trivia['category']['title'] }
        content.append(dict)
    return render(request, 'trivia/home.html', {'trivia' : content})

def search(request):
    # Search Box
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data
            query = text['category']
        return HttpResponseRedirect('/search/' + query if query!= "" else "none")
    else:
        form = CategoryForm()

    success = False
    content = []
    offset = ran.randint(0, 2000)
    req = "http://jservice.io/api/categories?count=100" + "&offset=" + str(offset)
    response = requests.get(req)
    category_set = response.json()
    for category in category_set:
        dict = {'title': category['title'], 'id': category['id']}
        content.append(dict)

    return render(request, 'trivia/search.html', {'categories': content, 'form': form})

def search_trivia(request, text):
    content = []
    clues_set = []
    success = False

    # Show trivia questions by Category, Time, Difficulty (3 Loops)
    if True:  # if text != "" or time != "" or difficult != "":
        offset = 0

        while True:  # Filter By Category
            req = "http://jservice.io/api/categories?count=100&offset=" + str(offset)
            response = requests.get(req)
            category_set = response.json()

            if offset >= 100: # change to get more categories
                break

            # Find right category
            for category in category_set:
                if category['title'] == None:
                    break

                # Add all the questions/clues from that category and append to larger list
                elif (text == "none") or (text != "" and text in category['title']):  # if there is no query or if there is a query
                    clue_req = "http://jservice.io/api/clues?category=" + str(category['id'])
                    clue_response = requests.get(clue_req)
                    clue_question_set = clue_response.json()
                    clues_set += clue_question_set

            offset += 100

        for clue in clues_set: # Filter By Time, loop through content
            pass

        for clue in clues_set: # Filter By Difficulty, loop through content
            pass

    else:  # General Category List - No refinement for category, date, difficulty
        success = False
        req = "http://jservice.io/api/categories?count=100"
        response = requests.get(req)
        category_set = response.json()
        for category in category_set:
            dict = {'title': category['title'], 'id': category['id']}
            clues_set.append(dict)

    if len(clues_set) != 0:
        success = True

    for clue in clues_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'category':clue['category']['title']}
        content.append(dict)

    print(content)

    return render(request, 'trivia/trivia.html', {'trivia': content, 'title' : text, 'success' : success})

def category_trivia(request, id='11510'):
    req = "http://jservice.io/api/category?id="+id
    response = requests.get(req)
    question_set = response.json()['clues']
    content = []
    for question in question_set:
        dict = {'id': question['id'], 'question': question['question'], 'answer': TAG_RE.sub('', question['answer'])}
        content.append(dict)
    return render(request, 'trivia/trivia.html', {'questions': content, 'category': response.json()['title'], 'success': True})

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