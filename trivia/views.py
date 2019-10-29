from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.shortcuts import render
from trivia.forms import CategoryForm
import requests
import random as ran
import re
import datetime

# To remove HTML markup in displaying results
TAG_RE = re.compile(r'<[^>]+>')

def home(request):
    req = 'http://jservice.io/api/random?count=50'
    response = requests.get(req)
    trivia_set = response.json()
    content = []
    for trivia in trivia_set:
        dict = { 'id': trivia['id'], 'question' : trivia['question'], 'answer' : TAG_RE.sub('', trivia['answer']),
                 'category' : trivia['category']['title'], 'airdate' : trivia['airdate'][:10], 'value': trivia['value'],
                 'category_id' : trivia['category_id']}
        content.append(dict)
    return render(request, 'trivia/home.html', {'trivia' : content})

def search(request):
    # Search Box
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data

            cate = data['category'] if data['category']!= "" else None
            diff = data['difficulty'] if data['difficulty']!= "" else None
            from_date = data['from_date'] if data['from_date'] != None else datetime.date(1966, 1, 1)
            to_date = data['to_date'] if data['to_date'] != None else datetime.date(2011, 12, 12)

            return search_trivia(request, cate, diff, (from_date, to_date))

    form = CategoryForm()
    content = []
    offset = ran.randint(0, 2000)
    req = "http://jservice.io/api/categories?count=100" + "&offset=" + str(offset)
    response = requests.get(req)
    category_set = response.json()
    for category in category_set:
        dict = {'title': category['title'], 'id': category['id']}
        content.append(dict)

    return render(request, 'trivia/search.html', {'categories': content, 'form': form, 'titleBar' : "Search"})

def search_trivia(request, cate, diff, date):
    content = []
    clues_set = []
    success = False

    # Show trivia questions by Category, Time, Difficulty (3 Loops)
    offset = 0
    cates = []
    while True:
        req = "http://jservice.io/api/categories?count=100&offset=" + str(offset)
        response = requests.get(req)
        category_set = response.json()

        if offset >= 10000: # change to get more categories
            break

        # Find right category
        for category in category_set:
            cates.append(category['title'])
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
                    airdate = datetime.date(int(clue['airdate'][:4]), int(clue['airdate'][5:7]), int(clue['airdate'][8:10]))

                    if value == None:
                        continue

                    # Filter by Difficulty
                    dict = {'easy': 0 < value <= 400,
                            'medium': 400 < value <= 800,
                            'hard': 800 < value <= 1000,
                            None : True}
                    hardness = dict[diff]

                    # Filter by Date
                    # timeframe = True if (date == None) or (airdate == str(date)+"T12:00:00.000Z") else False # if there is no date or the date matches exactly, add it
                    timeframe = date[0] <= airdate <= date[1]

                    if hardness and timeframe: # only if it meets difficulty requirements and timeframe requirements
                        clues_set.append(clue)

        offset += 100

    if len(clues_set) != 0:
        success = True

    f = open("all_categories.txt", "w")
    f.write(str(cates))

    for clue in clues_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']),
                'category': clue['category']['title'], 'airdate': clue['airdate'][:10], 'value': clue['value'],
                'category_id': clue['category_id']}
        content.append(dict)

    return render(request, 'trivia/trivia.html', {'trivia': content, 'title' : cate, 'success' : success, 'titleBar' : cate})

def category_trivia(request, id='11510'):
    req = "http://jservice.io/api/category?id="+id
    response = requests.get(req)
    set = response.json()
    question_set = set['clues']
    title = set['title']
    content = []
    for clue in question_set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'airdate': clue['airdate'][:10], 'value': clue['value'],
                'category_id' : set['id'], 'category': set['title']}
        content.append(dict)
    return render(request, 'trivia/trivia.html', {'trivia' : content, 'title' : title, 'success': True, 'titleBar' : "Category"})

def difficulty_trivia(request, id='200'):
    req = "http://jservice.io/api/clues?value="+id
    response = requests.get(req)
    set = response.json()
    content = []
    for clue in set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'airdate': clue['airdate'][:10], 'value': clue['value'],
                'category_id' : clue['category']['id'], 'category': clue['category']['title']}
        content.append(dict)
    return render(request, 'trivia/trivia.html', {'trivia' : content, 'title' : "Difficulty of "+id, 'success': True, 'titleBar' : "Difficulty"})

def airdate_trivia(request, id='2018-01-01'):
    req = "http://jservice.io/api/clues?min_date="+id+"T12:00:00.000Z&max_date="+id+"T12:00:00.000Z"
    response = requests.get(req)
    set = response.json()
    content = []
    for clue in set:
        dict = {'id': clue['id'], 'question': clue['question'], 'answer': TAG_RE.sub('', clue['answer']), 'airdate': clue['airdate'][:10], 'value': clue['value'],
                'category_id' : clue['category']['id'], 'category': clue['category']['title']}
        content.append(dict)
    return render(request, 'trivia/trivia.html', {'trivia' : content, 'title' : id, 'success': True, 'titleBar' : "Airdate"})

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

def error_404(request, exception):
    response = render(request, 'trivia/404.html', {'titleBar' : "Page Not Found"})
    response.status_code = 404
    return response

def error_500(request):
    response = render(request, 'trivia/404.html', {'titleBar' : "Page Not Working"})
    response.status_code = 500
    return response

def game(request):
    return render(request, 'trivia/game.html', {'titleBar' : 'Game'})