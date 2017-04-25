// Quiz State object
var quizState = {
   questionIndex: 0,
   questions:  [
        {
            question: 'In music, what instrument keeps the rythmn and tempo?',
            choices: ['Piano','Drums','Bass Guitar', 'Metronome'],
            correctAnswer: 'Drums',
        },
        {
            question: 'What musical instrument can allow you to have a great workout while playing it?',
            choices: ['Drums','Guitar','Triangle', 'Zylophone'],
            correctAnswer: 'Drums'
        },
        {
            question: 'What part of the drumset can act as the metronome during a song?',
            choices: ['Snare','Kick Drum','Cymbals', 'Hi-hats'],
            correctAnswer: 'Hi-hats' 
        },
        {
            question: 'What is the name of this drum piece?',
            questionImage: '<img src="img/snare-drum.jpg">',
            choices: ['Tom','Hi-Hat','Snare', 'Kick Drum'],
            correctAnswer: 'Snare' 
        },
        {
            question: 'Which parts of a drumset do you use your feet to make/alter a sound?',
            choices: ['Hi-Hat and Kick Drum','Kick drum and Snare','Hit-Hats and Toms', 'Kick Drum and Cymbals'],
            correctAnswer: 'Hi-Hat and Kick Drum'
        },
        {
            question: 'What is the name of this piece?',
            questionImage: '<img src="img/drum-throne.jpg">',
            choices: ['Drum Seat','Drum Chair','Drum Stool', 'Drum Throne'],
            correctAnswer: 'Drum Throne'
        },
        {
            question: 'What is the best instrumnet to play in the world?',
            choices: ['Drums','Piano','Electric Guitar', 'Bass Guitar'],
            correctAnswer: 'Drums'
        }
    ],
    score: 0,
}

var startQuizHandler = function(){
    $('.startQuiz').on('click', function(event){
        event.preventDefault();
        $('.quizStartWrapper').fadeOut(500);
        $('.questionWrapper').delay(500).fadeIn();
    });
}

var displayResults = function(){
    $('.questionWrapper').fadeOut(500);
    $('.quizEndWrapper').delay(500).fadeIn();

    var answersCorrect      = quizState.score;
    var numberOfQuestions   = quizState.questions.length;

    var quizScore = Math.ceil((answersCorrect / numberOfQuestions ) * 100);

    if (quizScore > 50){
        var overFiftyMessage = 'Congratulations! You got <strong>' + answersCorrect + '</strong> out of <strong>' + numberOfQuestions + '</strong> answers correct. Your score is: ';

        $('.endMessage').html(overFiftyMessage);
        $('.results').addClass('greenText');
    } else {
        var underFiftyMessage = 'Not bad. You got <strong>' + answersCorrect + '</strong> out of <strong>' + numberOfQuestions + '</strong> answers correct. Your score is: ';

        $('.endMessage').html(underFiftyMessage);
        $('.results').addClass('yellowText');
    }

    $('.results').text(quizScore + '%');
}

var renderQuiz = function(quizState){
    var questionTitle      = quizState.questions[quizState.questionIndex].question;

    $('.questionTitle').text(questionTitle);

    var choicesArray = quizState.questions[quizState.questionIndex].choices;
    
    var choicesHtml = choicesArray.map(function(choice){
        return '<div class="inputWrapper"> <input type="radio" name="answer" value="' + choice + '"> <span>' + choice + '</span> </div>';
    })

    $('.answersWrapper').html(choicesHtml);

    if(quizState.questionIndex === 3 || quizState.questionIndex === 5){
        var questionImage = quizState.questions[quizState.questionIndex].questionImage;

        if ($('.choiceWrapper').children('img')){
            $('.choiceWrapper').children('img').remove();
            $('.choiceWrapper').prepend(questionImage);
        } else {
            $('.choiceWrapper').prepend(questionImage);
        }
    } else {
        $('.choiceWrapper').children('img').remove();
    }
}

var incrementQuestionIndex = function(quizState){
    quizState.questionIndex++
}

var addQuestionProgress = function(quizState){
    var progresNumber = quizState.questionIndex + 1;
    var numberOfQuestions = quizState.questions.length;

    $('.currentQuestionNumber').text(progresNumber);
    $('.numberOfQuestions').text(numberOfQuestions);
}

var hideNextShowSubmit = function(){
    $('input[type=submit]').show();
    $('.nextButton').hide(); 
}

var resetQuestion = function(){
    $('.message').removeClass('correct error');
    $('.message').text(' ');
}

var incrementScore = function(quizState){
    quizState.score++
}

var resetQuiz = function(quizState){
    $('.results').removeClass('greenText yellowText');
    quizState.questionIndex = 0; 
    quizState.score = 0;  
    document.getElementById("drumQuiz").reset();

    resetQuestion();
}

$(document).ready(function(){
    startQuizHandler();
    renderQuiz(quizState);
    addQuestionProgress(quizState);
    
    $('.nextButton').on('click', function(event){   
        resetQuestion();  
        hideNextShowSubmit();           
        renderQuiz(quizState);
        addQuestionProgress(quizState);
    });

    $('.restartQuiz').on('click', function(event){
        resetQuiz(quizState);
        hideNextShowSubmit(); 

        $('.quizEndWrapper').fadeOut(500);
        $('.questionWrapper ').delay(500).fadeIn();

        addQuestionProgress(quizState); 
        renderQuiz(quizState);
    });

    $('#drumQuiz').submit(function(event){
        event.preventDefault();

        var selectedAnswer = $('input:checked').val();
        var correctAnswer = quizState.questions[quizState.questionIndex].correctAnswer;

        if(selectedAnswer === correctAnswer){
            $('.message').addClass('correct').text("Correct!");
            incrementScore(quizState);
        } else {
            $('.message').addClass('error').text("Incorrect, Please continue.");
        }

        $('input[type=submit]').hide();
        $('.nextButton').show(); 
        
        if(quizState.questionIndex === 6){
            displayResults();
            $('.nextButton').hide();
        } else {
            incrementQuestionIndex(quizState);
        }

    });

});