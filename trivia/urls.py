from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='trivia-home'),
    path('search/', views.search, name='trivia-search'),
    path('category/<id>', views.category_trivia, name='trivia-category'),
    path('airdate/<id>', views.airdate_trivia, name='trivia-airdate'),
    path('difficulty/<id>', views.difficulty_trivia, name='trivia-difficulty'),
    path('game/', views.game, name='trivia-game'),
    path('random', views.random, name='trivia-random') # first ever page
]
