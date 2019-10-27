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
        dict = { 'id': trivia['id'], 'question' : trivia['question'], 'answer' : TAG_RE.sub('', trivia['answer']), 'category' : trivia['category']['title'], 'airdate' : trivia['airdate'][:10], 'value': trivia['value']}
        content.append(dict)
    return render(request, 'trivia/home.html', {'trivia' : content})

def search(request):
    # Search Box
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data

            cate = data['category'] if data['category']!= "" else None
            diff = data['difficulty']
            date = data['date'] if data['date'] != None else None

            return search_trivia(request, cate, diff, date)

    form = CategoryForm()
    content = []
    offset = ran.randint(0, 2000)
    req = "http://jservice.io/api/categories?count=100" + "&offset=" + str(offset)
    response = requests.get(req)
    category_set = response.json()
    for category in category_set:
        dict = {'title': category['title'], 'id': category['id']}
        content.append(dict)

    return render(request, 'trivia/search.html', {'categories': content, 'form': form})

def search_trivia(request, cate, diff, date):
    content = []
    clues_set = []
    success = False

    # Show trivia questions by Category, Time, Difficulty (3 Loops)
    offset = 0

    while True:
        req = "http://jservice.io/api/categories?count=100&offset=" + str(offset)
        response = requests.get(req)
        category_set = response.json()

        if offset >= 10000: # change to get more categories
            break

        # Find right category
        for category in category_set:
            if category['title'] == None:
                break

            # Filter By Category
            # Add all the questions/clues from that category and append to larger list
            elif (cate == None) or (cate != "" and cate in category['title']):  # if there is no query or if there is a query
                clue_req = "http://jservice.io/api/clues?category=" + str(category['id'])
                clue_response = requests.get(clue_req)
                clue_question_set = clue_response.json()

                for clue in clue_question_set: # Loop through all the questions in one category
                    value = clue['value']
                    airdate = clue['airdate']
                    if value == None:
                        continue

                    # Filter by Difficulty
                    dict = {'easy': 0 < value <= 400,
                            'medium': 400 < value <= 800,
                            'hard': 800 < value <= 1000}
                    hardness = dict[diff]

                    # Filter by Date
                    timeframe = True if (date == None) or (airdate == str(date)+"T12:00:00.000Z") else False # if there is no date or the date matches exactly, add it

                    if hardness and timeframe: # only if it meets difficulty requirements and timeframe requirements
                        clues_set += clue_question_set

        offset += 100

    if len(clues_set) != 0:
        success = True

    for clue in clues_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'category':clue['category']['title'], 'airdate' : clue['airdate'][:10], 'value': clue['value']}
        content.append(dict)

    # print(content) # content = {clue num, question, answer, category title}

    return render(request, 'trivia/trivia.html', {'trivia': content, 'title' : cate, 'success' : success})

def category_trivia(request, id='11510'):
    req = "http://jservice.io/api/category?id="+id
    response = requests.get(req)
    set = response.json()
    question_set = set['clues']
    title = set['title']
    content = []
    for clue in question_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'airdate': clue['airdate'][:10], 'value': clue['value']}
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