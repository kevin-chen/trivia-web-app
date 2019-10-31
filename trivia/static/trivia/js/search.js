function displayAnswer(id, answer) {
    let button = document.getElementById('answer'+id);
    var newEl = document.createElement('p');
    newEl.setAttribute('style', 'font-family: American Typewriter');
    newEl.innerHTML = answer;
    button.parentNode.replaceChild(newEl, button);
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ['pair of dice, lost', 'mixed bag', 'let\'s "ch"at', 'prehistoric times', 'acting families', 'world city walk', 'tough-pourri', 'visualliteration', "quotations from bartlett's", 'fill in the history _____', 'celebrity sister surnames', "the state it's in", '"hot" stufff', 'animal words & phrases', "you're in this foreign country if...", 'the secret lives of teachers', 'harry truman', 'contract killings', 'sham, wow!', "that's just ducky", 'parts', 'say it in latin', 'east asia', 'batman tv villains', 'danswers', 'diamonds are forever', '"motor" head', 'transformed food', 'story time', 'pet projects', 'early american history', "it's all in the game", "let's eat", 'heads of state', "kids' tv", 'named for their looks', 'the great state of...', 'narnia', 'cookbooks for kids', 'nelson mandela', 'cowboys & indians', 'words for youngsters', 'monday, monday', 'celebrity yearbook superlatives', 'storytellers', 'u.s. army 5-star generals', 'killed by deathh', 'poe', 'the nifty 1930s', 'you need a drink', 'kids rule!', 'animated creatures', 'spiders, man!', 'port of call', 'zip it!', 'the british prime minister when', 'double double "o"', 'world wide webs', 'to the lighthouse', 'civil war generals', 'best actor oscar winners', 'the new york times style', 'souvenirs', 'city spelling', 'talk like "dis"', 'celebrity lipsticks', 's.o.s.', 'just deserts', 'back to business', "song titles' missing beginnings", 'the frog rolls in', 'dot-com doom', 'get outta my dreams', 'get into my czar', 'crossword clues "t"', 'moonraker', 'a quantum of shoelace', 'doctor, no', "4 i's only", 'james bond', 'magazines', 'here, piggy, piggy, piggy', 'scrambled gods & goddesses', 'on the 3rd of july', 'title women in song', 'composers & their kin', 'pubs & taverns', 'rhymeless words', 'ballet', 'college football quotes', 'tasty ad slogans', "i'm funemployed", 'medical prefixes & suffixes', 'lighten up', 'ann(e)-tastic!', 'shakespeare quotes', 'literature in the 1800s', 'nfl logos', "ben & jerry's flavors", "classical works' other names", 'in the bible', 'gullible travels are cool', 'ride on', 'sex & the kitty', 'poison ivy, oak & sumac', "who played 'em?", 'as "if"!', 'whatever!', 'school mottoes', 'country name etymology', 'america the beautiful', 'movie remakes', 'this, or that', 'a world of music', 'i feel a bit "ill"', 'take my temperature', 'as quick as you can say...', 'jackie robinson', 'name that june', 'the razzies for 2008', 'cabinet departments in other words', 'holmes, sherlock holmes', "here's something random", "it's astronomical!", 'animal words', 'state university alumni', 'historical home shopping', 'guinness records', 'royal movies?', 'the new york times book review', 'the puck stops here', 'beastly blues', 'a man called horace', 'potent potables, southern style', '"ker"', 'everything\'s coming up "rose"s', 'potpourri (really)', 'opera crossword clues', 'sports net', "last name's the same", 'look!  up in the sky!', 'so you think you can france', '"bot" of course', 'into africa', 'ancient roman dining', 'going "pro"', 'quotes from the king james bible', 'are you ready for some foosball', 'common computer abbrev.', 'weird scents', 'the heloise with you', '"j" mart', 'he was president when...', 'record labels', 'do-gooders', 'the british are different', 'top 40 commencement addresses?', 'ballets alex could star in', 'obscure america', 'fast food chains in other words', '(whoops)', 'choice 4-letter words', 'one of these things is not like the others', 'in florida', "a year ending in '09", 'movies by songs', "'cause i'm going to...", 'bride & gloom', 'a new line of barbies?', "from the british monarchy's website", 'crossword clues "f"', 'wimbledon singles champs', '12-letter words', 'the literary cheerleader!', 'common rhymes', 'a series of fields', 'name your business', "i'm getting hungry", 'spell it backwards', 'let me take you down', 'the "oc"', 'welcome to lisbon', 'tailgate cuisine', 'is there a doctor in the house?', 'come fly with me', 'anagrams', 'fun with letters', 'uppers & downers', 'i killed a guy once', 'name calling', 'silent partners', 'the day the music died', "it's chinatown, jake", 'broadway debuts', '"a____a" in the atlas', '2 first names?', 'not hard at all', 'easy street', "child's play", 'duck! soup', 'in the bag', 'it\'s a "snap"', 'angry moms of future presidents', 'similes', "that's historic", 'toon tunes', 'cop talk', '"utter" your response', '15 minutes of fame', 'how inventive', 'bodies of water', 'presidents & vice presidents', 'rhyming product names', 'alexander', 'the "great"', 'absolute adjectives', 'the new york times technology', "let's go to italy", 'revolving restaurants', 'on board game boards', 'the "anti"-category', 'miro, miro on the wall', 'sports illustrated sportsman of the year', "hollywouldn't", 'dog-eared pages', 'nautical rhyme time', 'june 5 babies', "what's your function?", "who's the fairest one of all?", 'the world at war', 'fruit of the klum', 'wars by battle', 'celebrity anecdotes', 'hidden agenda', 'you are very subtractive', 'mmm...donuts', '"i" openers', 'also a canterbury tales pilgrim', 'oh, what a tangled website we weave', 'what a knockout!', 'literary movements', 'holidays & observances', 'first female leaders', "rolling stone's 100 greatest singers", 'advertising icons', "states' geographic centers", 'number, please', 'the dallas cowboys', 'car brands by emblem', 'founders', 'news from the 21st century', 'a sneezy category', '"atch", you!', 'historical military therapy sessions', 'u.s. stamps', 'also a dog command', 'hobo a go go', 'riding the "rail"s', 'native american place names', 'the human animal', 'vampires are everywhere', "time's top 10 everything of 2008", 'scrambled eggs', 'truth or dare', 'beach volleyball', 'their first top 10 solo hit', 'at the drugstore', '20th century news', "that's criminal!", '"road" test', 'hybrid poodles', 'the special olympics', 'marcus', 'a potent potable tour', 'oh, shaw!', 'well, "b"!', 'stupid answers: the british edition', 'the national museum of the marine corps', 'colonialism in africa', 'fictional games', 'restaurant lingo', 'states by state parks', 'a river runs through it', 'getting your actor together', 'scintillating syllabus', 'missing words', 'fun with numbers', 'what are you afraid of?', 'the sporting life', 'fun with fashion', 'how many players on each side?', 'fun with science', 'tv geography', "kickin' it old school", "cities' newer names", 'you\'re a "q____t"', "you can't spell jeopardy! without party!", 'schools named after people', 'college-podge', 'place name partners', 'psych!', '"back" to school', 'at bay', 'pop goes the category', 'hookups', 'asserting author-ity', 'one-button text messaging', 'the 21st century with cnn', 'name that game show', 'econ 101', 'take a "shot"', "the greek god's roman name", 'fictional munchies', "grandma's lotto numbers", 'fish tales', 'alex rocks in concert', '"b" fore & after', 'staying at home', 'the world comes to you', "what's on tv?", 'check the newspaper', 'take out the trash', 'time for a "nap"', 'sweet stuff', 'name the shakespeare play', 'political nicknames', 'movies in minivans', 'ad wear', "tra-la!  it's may!", 'the lady swings', 'would you like flies with that?', 'fast friends', "it's elementary", 'computer rhyme time', 'old folks in their 30s', 'movies & tv', 'a state of college-ness', 'animal collective', "i'd rather be skiing", 'parlez vous?', 'military installations by state', 'the fortune 500', 'in the encyclopedia', 'name the work', 'heisman winners', 'i want to ride that!', 'a horse is a horse', 'rhymes with track', "you're a jeopardy! fan if\x85", 'purple prose & poetry', 'also a color', 'i married a beatle', 'darth vader, d.d.s.', '"g"', 'your hair', 'smells terrific', 'common bonds', 'name that prez', 'the battle of bull run', 'movies any time', 'genesis', 'your college i.d.', 'dictionary abbr.', 'guinness', 'aaron spelling bee', 'imbiblers', 'spheres', 'animated word puzzles', 'best actress oscar by film', 'fun with eponyms', 'the new york times times machine', 'quasi-stupid answers', 'ahd negative prefixes', 'behind the seuss-ic', 'the celebrity bling biz', 'name their island chain', 'secret service code names 2009', 'sounds like a sneeze', "the president's first 100 days", 'paddle', 'i hear banjos', 'not literally', 'foreign language', 'a priest, an elephant & evel knievel...', 'walk into a "bar"', 'the bartender says...', 'what is this, some kind of joke?', 'band debuts by decade', 'unwritten dining-out rules', 'popcorn colonels', 'big fan', "that's not where you think it is", 'the new york times business', 'the most wanted list', 'anagrams of compass directions', 'the nature of the beast', 'wonders of the midwest', "tv's gone but not forgotten", 'the butler did it', 'body english', "texas hold'em hands", 'birthstones... meet the birthstones', 'yabba dabba "doo"!', 'there once was this man from...', 'this will slay you', "it's a country thing", 'name that mammal', 'modern technology', 'words from places', 'crime', 'joe the plumber', 'the office games', 'biblical non-prophet', 'just a "sec"!', 'the report of my death...', "it's not so", "in joe paterno's first year", 'rolling rock', 'sam adams', '"up" words', 'st. paul-y girl', '"bud"', 'top seller in the u.s.', 'scandalous nursery rhymes', '"c"ooking', 'some call it blasphemy', 'alphabetically last letter', 'books that became films', 'prepositions', 'fortune-telling', 'the novel list', 'the new york times: arts & leisure', 'presidential potent potables', 'this, that', 'the other', '2027: the year in entertainment', 'waist management', 'discoveries', 'religions', 'central park statues', 'the last', '2 "b" or not 2 "b"', 'snl actors & their characters', "good o'men", 'movable feasts', 'british bands', 'the cold war', 'the clash', 'yes', 'record of the year grammys', 'geek chic', 'su-su-sushi-o', 'the "end" zone', 'vegas films', "the play's the thing", 'at the buffet', 'flooring', "rebellions: shays' & whiskey", 'musical heart conditions', 'authors & their sleuths', 'personal fowls', "i'm latin intolerant", 'the end of the marathon', 'poetic words', 'before & after', 'prez dispensers', '18th century literature', 'a storied history', 'rome, the eternal city', '& the 21st century emmy goes to...', 'when politicians speak', 'i want my suv', 'stephen, king of writing', 'the new york times crossword puzzle', 'classic albums', 'other places to gamble', 'writers on film', 'words in tournament', 'broadway musical adjectives', 'march', 'in like a lion', 'out like a "lam"', 'the sopranos', 'battles by present-day country', '1961', 'tricky stupid answers', 'an "o\'" category', "maybe we'll invade britain!", "that's not cricket", 'email etiquette', 'dumb stuff i saw on the road', 'tasmania mania', '"a" travel category', 'get out your bibles', 'architectural words (& hints)', 'poking around space', 'brand logos', 'words with all 5 vowels', 'omaha beach', 'musicals by plot', 'fashion forward & backward', 'medicine show', 'going alphanumeric', 'science history', 'song dichotomy', 'putting on the dog', 'i like...me!', 'what sign are you?', 'starts with "sch"', 'national memorials', 'world music', 'a little lit', 'also a vegas casino', 'challenging the bartender', 'explorers & exploration', '"c-e-s"', "lands o' lakes", 'going into o____t', 'the john c. fremont experience', 'shows by show tunes', 'sid & nancy', "you're in the cabi-not!", 'adverbially yours', 'hello, newton', 'describing the tv show', '19th century france', 'business letters', 'lesser-known lines', 'steve win', 'techno lust', "movies' last lines", 'historical voicemails from...', 'in the state capital', 'aka', 'they should have played vegas', '"bo"pourri', 'bank on it', 'name that critter', 'name the capital city', 'weeds', 'balls of fury', 'hollywood non-squares', 'food for thought', 'state flags', "it's hard out here for a shrimp", 'edible common bonds', '50 years of barbie', 'material', 'gray matter', 'compound words', 'dysfunction junction', 'hud', 'the "-sting"', 'paul newman', 'non-memorable movie quotes', 'to "sur"', 'with love', 'dancing stars', 'cable channels', 'moo', 'cannibal cuisine', 'we\'re all "waiting"', 'europe, ages ago', 'rule britannia', 'have a beer & a slogan', 'seldom is heard', 'a discouraging word', 'the african american experience', 'john j. pershing', 'day planners of the stars', 'you need to convert', 'fab 5 freddy', 'i need a flavor', "it's not a crime!", "literary characters' e-mails", 'mit den beatles', "that's the fact, jack!", "i'm in such a state!", 'pluralize it!', 'shades of blue', 'top 10 yahoo! searches', 'typing test', 'poisoning', 'pigeons', 'in the park', 'death of a president', 'as listed in the s.i. almanac', 'drink, skin care item or r&b singer', 'colorful terms', 'the garden', 'of "e" den', 'the 1960s', 'the quotable keith richards', 'in the office fridge', 'the southern dandy expounds', 'change the vowels', 'ancient books', 'nfl team nicknames', 'adam', 'eve', 'the serpent', 'the underground railroad', 'so long', 'good buy!', 'chow', "can't get enough opera", 'cy young award winners', 'newly discovered chemical elements?', '"north" & "south"', 'east & west', 'this is one slimy category', 'branded', "kids don't realize", 'foodie techniques', 'go directly to yale', 'do not pass "go"', 'do not collect $200', '1909: 100 years ago', 'butch cassidy', 'the hustler', 'road to perdition', 'seinfeld', 'government acronyms', 'medical milestones', '"cu"', 'later', 'coats of arms', 'prophet sharing', 'get into gere', 'nightly news words', 'literary crossword clues "l"', 'mnow your mnemonics', 'women of the world', '"ind" the know', 'they got it on ebay!', 'brit speak', 'happy 200th, lincoln & darwin', "top 40 songs' missing links", 'for all you latin lovers', 'this gland is your gland', 'what day is it?', 'the gadsden purchase', 'no animals were harmed', 'superhero cinema', 'presidential brangelinas', 'from a to y', 'sizing it up', 'beloved films', 'tall in the family', 'sounds like one letter', 'rotten poetry about good poets', 'the first millennium a.d.', 'their greatest hits albums', "veterans' benefits", 'funeral officiants', 'fashionable common bonds', 'colorful rhyme time', 'the spanish-american war', 'george carlin', 'lines from the sitcom', 'the nearest', 'good eats with alton brown', 'hiding on the internet', '"multi" tasking', 'a place for my stuff', "it's bad for ya", 'on campus', 'what am i doing in new jersey?', 'playin\' with your "head"', 'sports facts', 'brand-tastic', 'apt anagrams', 'a thomas guide', "it's an l.a. thing", 'diplomacy--a game', 'rock formations', 'fundraising', 'delaware', 'the "first" state', 'the audacity of bob hope', "don't say      moby dick", "where's the beef from?", 'game shows in tv & movies', 'all the marbles', 'serenity now!', 'aboard an aircraft carrier', 'food words & phrases', 'the northernmost nation', 'arnold palmer', "dante's divine comedy", "the player's pro team", 'american education', 'it happens once a year', 'stage "right"', 'shakespearean actors', 'podge-pourri', '"ow"!', 'courtroom dramas', 'fark.com headlines', 'haiku to the chief', 'stupid word origin answers', 'a series of unfortunate events', 'elvis costello', 'pump it "up"', 'niagara falls', 'historic america', "not so lil' waynes", "it's a group thing", 'the red, white & brew', 'fiction science', 'movie titles!', 'which is tallest?', 'the dark side of commercial mascots', '"tri" me', 'book reviews by tarzan', 'sex & the city', 'theme park fun', 'i ran for prez in 2008', '"in" words', "it's too late", 'video games', '50+ home runs', 'posh & becks', '2 animals, 1 word', 'products', '"mad" love', 'the louvre', 'earn, baby, earn', "jay leno's headlines", 'show me your peninsula!', 'how well do you know "me"?', 'this just in', 'world place names', 'the last supper', 'films of the 1980s', 'death by...', 'weapons of mass instruction', 'guitar hero', 'grand theft auto', 'world of warcraft', 'rock band', 'half-life', "you don't mess with the lohan", "there's no place like home", 'stupid geographic answers', 'shall we reproduce?', 'you "go" first', 'make your pitch', 'also a superhero', "let's learn some semaphore", "historic figures' made-up nicknames", 'we wax philosophic', 'text messaging', 'central park entertainment', 'button it!', 'the 5 pillars of islam', 'name the movie', 'rowing', 'over-the-counter culture', "that's not how that book ends!", 'just going through a phrase', "let's remove your gallbladder", 'also a planet', 'sore losers', 'your home aquarium', 'shaking up shakespeare', "name that conflict's century", 'a phrase of turn', 'you: being beautiful', 'songs from musicals', 'the holy "c"', 'historic supreme court decisions', "we've got issues", 'meeting your car maker', 'feel the paine', 'not-so-ugly betty', "wood you or woodn't you?", 'they still make that?', 'the battle of the sexes', 'libros en espaÑol', 'continental extremes', "dumb guys' greatest inventions", '"f" i do say so', 'wrong accents for literary characters', 'a little "b" bop', 'american graduators', 'very animated actors', 'occupational wear', 'dam that river', 'movie calendar', 'thingamajigs', 'funny-sounding food', "it's a crime!", 'glass & glassmaking', '"mo" better', 'famous rays', 'ballet music', '"it" is a 7-letter word', 'sports halls of fame', "america's got talent", '"p"ick this category!', '1958', 'sports initials', 'meet you in the middle', "thomas jefferson's monticello", 'historic quotations', 'will ferrell roles', 'the escaped dental patient', 'home for the holidays', 'news radio', 'traffic', 'sports on the 8s', '"kar"', '1450 a.m. (make that a.d.)', 'moving pictures', 'little pitchy dog', 'in there', 'hello, dali', 'paint your wagon', 'ahh, liver!', 'the sound of music', 'this & that', 'your 5-clue newscast', 'a musical menu', 'do you know jack about lit?', 'mr. & mrs. malaprop', 'signing in the reign', 'book dedications', 'tech-know-ledgy', 'a bunch of nuts', 'law', 'yours for an "ong"', 'all ashore for bird lore', "santa's coming", 'tv robots', 'the constitution today', "singers' rhyme time", 'the bayeux tapestry', 'spotted creatures', 'shades of gray & white', 'planet "earth"', 'the english top 100', "first name's the same", 'plants', 'public domain songs go heavy metal', 'jamaica, jordan or japan', 'we rewrite history!', 'where am i?', 'you need some backup', 'completes the shakespeare quote', 'christmas pudding', '"b-u-t" full', 'who made that alphanumeric thing?', 'just say "ro"', 'ad "lib"', 'fault lines', 'state of the union', '"letter"-letter words', 'the president as king', 'i\'m serving "t"', 'hook, line & sinker', 'send in the clowns', 'the biggest loser', 'never mind the follicles', "here's the pistols", 'gypsies, tramps & thieves', 'news of the weird', 'greece is the word', "it's got groove", "it's got meaning", 'new words in the oed', 'tennessee williams', 'named', 'red states', 'celebrity rhyme time', 'norm!', 'desire', 'ipod, youtube or wii', 'the "glass" menagerie', 'streetcar', 'stellar!', 'a closer look at art', 'their first top 40 pop hit', 'let me mix you a metaphor', "teams' retired jerseys", 'medical "t" time', 'meet the browns', 'the international butler academy', 'potent portables', 'presidential wit', 'fun with a porpoise', '2008: a subprime year', 'new york city songs', 'letters to congresspeople?', 'when they were teens', 'the net works', 'good application essay words', 'a-haunting we will go', 'teen choice awards 2008', "let's have order", 'pioneer life', 'world travel', '1983: the year in entertainment', 'women "r" us', 'addictionary', 'sounds of madison ave.', 'rhyme squad', 'biopic subjects', '75 years of esquire', 'make no mythtake', 'the specific palm reader', 'z boys', 'pass the turkey', '"dis" function', "it's all politically relative", 'the pro football hall of fame', 'the world almanac and book of facts', 'who did that tune?', 'when you go to college', "you're such an animal!", "i'll give you my impressions", 'de-electable', 'time to hit the books', 'celebrity scents', 'good works', "dr. alex' old-time feel-good medicine show", 'sullivan award winners', "you're a real gem!", 'huey long & the news', 'nordic track', 'tv title twosomes', 'how can we miss you if you never leave?', 'i\'m so "shr"', 'the national weather service', '"e" for effort', 'take the lead', 'antarctica', 'hey "u"!', 'facts & figures', 'eeeuw...gross!', 'sports team homes', 'letter-heads', 'all you need is gov.', 'you can quote me on that', 'msas', 'in toon', 'the magna carta', "i can't hear myself think", 'video gaming', "it's like, shakespeare, you know?", 'anagrammed presidential last names', 'the mysterious world of the kitchen', 'potty mouth!', 'urban dictionary lingo', '"high" anxiety', 'kids rule prime time', 'you give me the blues', 'state the landmark', "it wasn't rated r", 'the adventures of huckleberry finn', 'who wrote it?', 'literary rhyme time', 'color-full words', 'facial expressions', "here's the address", 'peter, peter', 'name the book', 'elvis a to z', 'the completely guilty bystander', 'head trauma', '"best" sellers', 'pumpkin eater', "had a wife & couldn't keep her", 'c\'est la "v"', 'disney films', 'heel of fortune', 'industrial light & magic', 'know business', 'small, medium or large', 'treblemakers', 'the fourth word', 'which time zone?', 'the "7"-year itch', 'dance to the music', "macbeth's witches on food network", 'the unfriendly skies', 'quests', 'ancient history', 'robbers', 'famous counts', 'days of creation', 'have a treat', 'morse code', 'just say "no"', 'go, kelly!', 'the pilgrims', 'shape up', 'what the "h"?', 'american experience: the presidents', '1980s tv']

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("category_form"), countries);