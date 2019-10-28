var score = 0;
var questionNum = 1;
var question = "Hello";
var answer = "";
var playing = false;
var success = false;

function gameOn () {


    if (playing) {
        let userAnswer = document.getElementById('guess')
        console.log(userAnswer.value)
        console.log(answer)
        console.log(answer.includes(userAnswer.value))
        if (answer.includes(userAnswer.value) && !answer.includes("")) {
            score += 1
        }
        questionNum += 1
    }

    // Reset Question
    let playField = document.getElementById('gamePlay')
    playField.innerHTML = "";

    fetch('http://jservice.io/api/random').then(function(resp) {
        return resp.json();
    }).then(function(data) {
        // Correct / Incorrect Response
        if (playing && success) {
            let successBanner = document.createElement("div");
            successBanner.setAttribute("class", "alert alert-success alert-dismissible");
            successBanner.setAttribute("role", "alert");

            let successText = document.createElement("a");
            successText.setAttribute("href", "#");
            successText.setAttribute("class", "close");
            successText.setAttribute("data-dismiss", "alert");
            successText.setAttribute("aria-label", "close");
            successText.innerHTML = "&times;";
            successBanner.innerHTML = "Correct!";
            successBanner.appendChild(successText);
            playField.appendChild(successBanner);
        }
        else if (playing && !success) {
            let successBanner = document.createElement("div");
            successBanner.setAttribute("class", "alert alert-danger alert-dismissible");
            successBanner.setAttribute("role", "alert");

            let successText = document.createElement("a");
            successText.setAttribute("href", "#");
            successText.setAttribute("class", "close");
            successText.setAttribute("data-dismiss", "alert");
            successText.setAttribute("aria-label", "close");
            successText.innerHTML = "&times;";
            successBanner.innerHTML = "Incorrect!";
            successBanner.appendChild(successText);
            playField.appendChild(successBanner);
        }

        // API request parse
        question = data[0]['question']
        answer = data[0]['answer']
        console.log(data)

        // Score
        let scoreText = document.createElement('h3');
        scoreText.innerHTML = "Score: " + score;
        playField.appendChild(scoreText);

        playField.appendChild(document.createElement("br"));

        // Question Box
        let bigBox = document.createElement('div');
        bigBox.classList.add('text-center');
        let smallBox = document.createElement('div')
        smallBox.classList.add('card');
        smallBox.setAttribute("style", "border-radius: 15px");
        bigBox.appendChild(smallBox);

        let headerBox = document.createElement('div');
        headerBox.classList.add('card-header');
        let headerText = document.createElement('h4');
        headerText.setAttribute("class", "my-0 font-weight-normal");
        headerText.innerHTML = "Question #" + questionNum;
        headerBox.appendChild(headerText)
        let bodyBox = document.createElement('div');
        bodyBox.setAttribute("class", "card-body text-dark");
        bodyBox.innerHTML = question
        smallBox.appendChild(headerBox)
        smallBox.appendChild(bodyBox)
        playField.appendChild(bigBox)

        playField.appendChild(document.createElement("br"));

        let inputField = document.createElement('input');
        inputField.setAttribute("id", "guess");
        inputField.setAttribute("style", "border-radius:300px");
        playField.appendChild(inputField);

        playField.appendChild(document.createElement("br"));
        playField.appendChild(document.createElement("br"));

        let submitButton = document.createElement("button");
        submitButton.setAttribute("class", "btn btn-outline-primary");
        submitButton.setAttribute("onclick", "gameOn();");
        submitButton.innerHTML = "Submit"
        playField.appendChild(submitButton);

        playing = true;


        setTimeout(function() {
            $(".alert").alert('close');
        }, 2000);
    });

}