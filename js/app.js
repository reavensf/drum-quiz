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
            question: 'What musical instrument can give you a great workout while playing it?',
            choices: ['Drums','Guitar','Triangle', 'Zylophone'],
            correctAnswer: 'Drums'
        },
        {
            question: 'What part of the drum set can act as the metronome during a song?',
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
            question: 'What is the name of this piece?',
            questionImage: '<img src="img/drum-throne.jpg">',
            choices: ['Drum Seat','Drum Chair','Drum Stool', 'Drum Throne'],
            correctAnswer: 'Drum Throne'
        },
        {
            question: 'Which parts of a drum set do you use your feet to make/alter a sound?',
            choices: ['Hi-Hat and Kick Drum','Kick drum and Snare','Hit-Hats and Toms', 'Kick Drum and Cymbals'],
            correctAnswer: 'Hi-Hat and Kick Drum'
        },
        {
            question: 'Which instrument does a drummer listen to follow its patterns during a song?',
            choices: ['Piano','Bass Guitar','Electric Guitar', 'None of the above'],
            correctAnswer: 'Bass Guitar'
        },
        {
            question: 'What cymbal is usually played on the same beat as the bass drum?',
            choices: ['Crash Cymbal','Splash Cymbal','Ride Cymbal', 'None of the above'],
            correctAnswer: 'Crash Cymbal'
        },
        {
            question: 'Which drum has the lowest tone in a drum set?',
            choices: ['Rack Tom','Floor Tom','Bass Drum', 'Snare'],
            correctAnswer: 'Bass Drum'
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

    if(quizState.questionIndex === 3 || quizState.questionIndex === 4){
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
        
        if(quizState.questionIndex === 9){
            displayResults();
            $('.nextButton').hide();
        } else {
            incrementQuestionIndex(quizState);
        }

    });

});