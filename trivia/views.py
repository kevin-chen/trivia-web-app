from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from trivia.forms import CategoryForm
import requests
import random as ran
import re

TAG_RE = re.compile(r'<[^>]+>')

def home(request):
    req = 'http://jservice.io/api/random?count=50'
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
        cate = "none"
        diff = "easy"
        if form.is_valid():
            text = form.cleaned_data
            cate = text['category']
            diff = text['difficulty']
            print(text['time'].year)
            return HttpResponseRedirect('/search/' + (cate if cate!= "" else "none") + "/" + diff)

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

def search_trivia(request, cate, diff):
    content = []
    clues_set = []
    success = False

    # Show trivia questions by Category, Time, Difficulty (3 Loops)
    offset = 0

    while True:  # Filter By Category
        req = "http://jservice.io/api/categories?count=100&offset=" + str(offset)
        response = requests.get(req)
        category_set = response.json()

        if offset >= 10000: # change to get more categories
            break

        # Find right category
        for category in category_set:
            if category['title'] == None:
                break

            # Add all the questions/clues from that category and append to larger list
            elif (cate == "none") or (cate != "" and cate in category['title']):  # if there is no query or if there is a query
                clue_req = "http://jservice.io/api/clues?category=" + str(category['id'])
                clue_response = requests.get(clue_req)
                clue_question_set = clue_response.json()

                for clue in clue_question_set:  # Filter By Time, loop through content
                    value = clue['value']
                    if value == None:
                        continue

                    # Filter by Difficulty
                    dict = {'easy': 0 < value <= 400,
                            'medium': 400 < value <= 800,
                            'hard': 800 < value <= 1000}
                    hardness = dict[diff]
                    if hardness:
                        clues_set += clue_question_set

                    # Filter by Date


        offset += 100

    for clue in clues_set: # Filter By Difficulty, loop through content
        pass


    if len(clues_set) != 0:
        success = True

    for clue in clues_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'category':clue['category']['title']}
        content.append(dict)

    print(content) # content = {clue num, question, answer, category title}

    return render(request, 'trivia/trivia.html', {'trivia': content, 'title' : cate, 'success' : success})

def category_trivia(request, id='11510'):
    req = "http://jservice.io/api/category?id="+id
    response = requests.get(req)
    set = response.json()
    question_set = set['clues']
    title = set['title']
    content = []
    for clue in question_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer'])}
        content.append(dict)
    return render(request, 'trivia/trivia.html', {'trivia' : content, 'title' : title, 'success': True})

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