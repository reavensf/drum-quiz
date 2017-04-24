// Quiz State object
var quizState = {
   questionIndex: 0,
   questions:  [
        {
            question: 'In music, what instrument keeps the rythmn and tempo?',
            choices: ['Piano','Drums','Bass Guitar', 'Metronome'],
            questionChoiceA: 'Piano',
            questionChoiceB: 'Drums',
            questionChoiceC: 'Bass Guitar',
            questionChoiceD: 'Metronome',
            correctAnswer: 'Drums',
        },
        {
            question: 'What musical instrument can allow you to have a great workout while playing it?',
            choices: ['Drums','Guitar','Triangle', 'Zylophone'],
            questionChoiceA: 'Drums',
            questionChoiceB: 'Guitar',
            questionChoiceC: 'Triangle',
            questionChoiceD: 'Zylophone',
            correctAnswer: 'Drums'
        },
        {
            question: 'What part of the drumset can act as the metronome during a song?',
            choices: ['Snare','Kick Drum','Cymbals', 'Hi-hats'],
            questionChoiceA: 'Snare',
            questionChoiceB: 'Kick Drum',
            questionChoiceC: 'Cymbals',
            questionChoiceD: 'Hi-hats',
            correctAnswer: 'Hi-hats' 
        },
        {
            question: 'What is the name of this drum piece?',
            questionImage: '<img src="img/snare-drum.jpg">',
            choices: ['Tom','Hi-Hat','Snare', 'Kick Drum'],
            questionChoiceA: 'Tom',
            questionChoiceB: 'Hi-Hat',
            questionChoiceC: 'Snare',
            questionChoiceD: 'Kick Drum',
            correctAnswer: 'Snare' 
        },
        {
            question: 'Which parts of a drumset do you use your feet to make/alter a sound?',
            choices: ['Hi-Hat and Kick Drum','Kick drum and Snare','Hit-Hats and Toms', 'Kick Drum and Cymbals'],
            questionChoiceA: 'Hi-Hat and Kick Drum',
            questionChoiceB: 'Kick drum and Snare',
            questionChoiceC: 'Hit-Hats and Toms',
            questionChoiceD: 'Kick Drum and Cymbals', 
            correctAnswer: 'Hi-Hat and Kick Drum'
        },
        {
            question: 'What is the name of this piece?',
            questionImage: '<img src="img/drum-throne.jpg">',
            choices: ['Drum Seat','Drum Chair','Drum Stool', 'Drum Throne'],
            questionChoiceA: 'Drum Seat',
            questionChoiceB: 'Drum Chair',
            questionChoiceC: 'Drum Stool',
            questionChoiceD: 'Drum Throne', 
            correctAnswer: 'Drum Throne'
        },
        {
            question: 'What is the best instrumnet to play in the world?',
            choices: ['Drums','Piano','Electric Guitar', 'Bass Guitar'],
            questionChoiceA: 'Drums',
            questionChoiceB: 'Piano',
            questionChoiceC: 'Electric Guitar',
            questionChoiceD: 'Bass Guitar', 
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

    var quizScore = Math.ceil((answersCorrect / numberOfQuestions ) * 100) + '%';

    if (quizScore > 50){
        var overFiftyMessage = 'Congratulations! You got ' + answersCorrect + ' out of ' + numberOfQuestions + ' answers correct. Your score is: ';

        $('.endMessage').text(overFiftyMessage);
    } else {
        var underFiftyMessage = 'Good job. You got ' + answersCorrect + ' out of ' + numberOfQuestions + ' answers correct. Your score is: ';

        $('.endMessage').text(underFiftyMessage);
    }

    $('.results').text(quizScore);
}

var renderQuiz = function(quizState){
    var questionTitle      = quizState.questions[quizState.questionIndex].question;
    var questionChoiceA    = quizState.questions[quizState.questionIndex].questionChoiceA;
    var questionChoiceB    = quizState.questions[quizState.questionIndex].questionChoiceB;
    var questionChoiceC    = quizState.questions[quizState.questionIndex].questionChoiceC;
    var questionChoiceD    = quizState.questions[quizState.questionIndex].questionChoiceD;

    $('.questionTitle').text(questionTitle);
    $('.inputA').text(questionChoiceA);
    $('.inputA').parent().find('input').val(questionChoiceA);
    $('.inputB').text(questionChoiceB);
    $('.inputB').parent().find('input').val(questionChoiceB);
    $('.inputC').text(questionChoiceC);
    $('.inputC').parent().find('input').val(questionChoiceC);
    $('.inputD').text(questionChoiceD);
    $('.inputD').parent().find('input').val(questionChoiceD);

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

var resetQuestion = function(){
    $('.message').removeClass('correct error');
    $('.message').text(' ');

    console.log('reset');
    $('input[type=submit]').show();
    $('.nextButton').hide(); 
}

var incrementScore = function(quizState){
    quizState.score++
}

var resetQuiz = function(quizState){
    quizState.questionIndex = 0;  
}

$(document).ready(function(){
    startQuizHandler();
    renderQuiz(quizState);
    addQuestionProgress(quizState);
    
    $('.nextButton').on('click', function(event){   
        resetQuestion();             
        renderQuiz(quizState);
        addQuestionProgress(quizState);
    })

    $('#drumQuiz').submit(function(event){
        event.preventDefault();

        var selectedAnswer = $('input:checked').val();
        var correctAnswer = quizState.questions[quizState.questionIndex].correctAnswer;

        if(selectedAnswer === correctAnswer){
            $('.message').addClass('correct').text("Correct!");
            incrementScore(quizState);
            console.log(quizState.score);
        } else {
            $('.message').addClass('error').text("Incorrect, Please continue.");
        }

        $('input[type=submit]').hide();
        $('.nextButton').show(); 
        
        if(quizState.questionIndex === 6){
            // resetQuiz(quizState);
            displayResults();
        } else {
            incrementQuestionIndex(quizState);
        }

    });

});