# Trivia Me This
Capital One Winter Summit

<p align="center">
  <img align="center" src="trivia/static/trivia/assets/co.png" width=400><br>
</p>

Link to depolyed website: http://trivia.kev-chen.me/

Link to GitHub repository: https://github.com/kevin-chen/trivia-web-app

## Prompt

To build a web app to find trivia questions by category, time, and difficulty

To complete this challenge, build a web application that:
* has a search function that displays results in an intuitive, responsive, mobile friendly, easy to navigate interface.
* gives users the ability to refine search results by:
  * date or timeframe aired (you can search by a day,  a week, a month)
  * trivia category
  * level of difficulty of the question
  * any other smart searching criteria you see fit

Optional: You may want to include these bonus features:

* Game board simulation with the categories and questions in the proper place (as it would be organized in the game with easier questions on top)
* Marking or saving questions into a "favorites" collection

Time spent: **15** hours spent in total

## Tech Stack

### Front-End

* HTML/CSS
* Bootstrap
* JavaScript

### Back-End

* Python/Django

### APIs

* JService API for trivia information
* Requests to parse JSON data

## User Features

The following **required** functionality is completed:

- [X] Searching page with search function displayed search results page
- [X] Ability to search with filters (category, airdate, difficulty)

The following **bonus** features are implemented:

- [X] Audio background music
- [X] Trivia game with scorekeeping
- [X] Automatic dropdown category search
- [X] Banner notifications (search successful, game response)
- [X] Sample random trivia questions on homepage
- [X] Specific trivia questions by category, airdate, and difficulty
- [X] UI Design (Flipping Cards)
- [X] Learn more button for each trivia card

## Future Features

- [ ] Make menu options more asthetic
- [ ] Make website more dynamic in other platforms (mobile and web)
- [ ] Improve searching algorithm

## Searching Algorithm:

In order to search through the many categories that JService provides, the application first searches through all the possible categories using the /Categories endpoint with a HTTP Request to get JSON trivia information from JService. While the program is searching through each matching category, it looks through the questions/clues of that category for other search filters such as date/timeframe aired and level of difficulty. If these criteria are a match, the clues are appended to a list which would be displayed on the search results page.

* Python and the web framework, Django to organize the project, redirect between pages, send requests with the JService endpoint, filter trivia questions by category, airdate, and level of difficulty

* HTML & CSS to display web pages with Bootstrap designs and allows user interactions

* JavaScript to develop a small trivia game, control audio features, and provide support for category search dropdown

## Challenges

* Parsing API data from JService in an efficient manner
* Passing data from one page to another using Django forms
* Styling flipping cards for each trivia question/clue
* Dynamic sizing for various pages and elements
* Implementing automatic dropdown for category searches

## Video Walkthrough

Here's a walkthrough of implemented user functions:

<img src="trivia/static/trivia/assets/Features/overview.gif" width=800><br>

## Features

### Home Page

<img src="trivia/static/trivia/assets/Features/homepage.png" width=800><br>

### Game Page

<img src="trivia/static/trivia/assets/Features/gamepage.png" width=800><br>

### Search Page

<img src="trivia/static/trivia/assets/Features/searchpage.png" width=800><br>

### Search Results

<img src="trivia/static/trivia/assets/Features/searchresults.png" width=800><br>

## Journey

### First

<img src="trivia/static/trivia/assets/Journey/first.gif" width=800><br>

### Second

<img src="trivia/static/trivia/assets/Journey/second.gif" width=800><br>

### Third

<img src="trivia/static/trivia/assets/Journey/third.gif" width=800><br>

### Fourth

<img src="trivia/static/trivia/assets/Journey/fourth.png" width=800><br>

### Fifth

<img src="trivia/static/trivia/assets/Journey/fifth.png" width=800><br>

### Sixth

<img src="trivia/static/trivia/assets/Journey/sixth.png" width=800><br>

### Seventh

<img src="trivia/static/trivia/assets/Journey/seventh.png" width=800><br>

## License

Copyright 2019 Kevin Chen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0 "Apache License")

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
