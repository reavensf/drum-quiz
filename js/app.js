// Quiz State object
var quizState = {
   questionIndex: 0,
   questions:  [
    {
        question: 'In music, what instrument keeps the rythmn and tempo?',
        questionChoiceA: 'Piano',
        questionChoiceB: 'Drums',
        questionChoiceC: 'Bass Guitar',
        questionChoiceD: 'Metronome',
        correctAnswer: 'Drums'
    },
    {
        question: 'What musical instrument can allow you to have a great workout while playing it?',
        questionChoiceA: 'Drums',
        questionChoiceB: 'Guitar',
        questionChoiceC: 'Triangle',
        questionChoiceD: 'Zylophone',
        correctAnswer: 'Drums'
    },
    {
        question: 'What part of the drumset can act as the metronome during a song?',
        questionChoiceA: 'Snare',
        questionChoiceB: 'Kick Drum',
        questionChoiceC: 'Cymbals',
        questionChoiceD: 'Hi-hats',
        correctAnswer: 'Hi-hats' 
    },
    {
        question: 'What is the name of this drum piece?',
        questionImage: '<img src="img/snare-drum.jpg">',
        questionChoiceA: 'Tom',
        questionChoiceB: 'Hi-Hat',
        questionChoiceC: 'Snare',
        questionChoiceD: 'Kick Drum',
        correctAnswer: 'Snare' 
    },
    {
        question: 'Which parts of a drumset do you use your feet to make/alter a sound?',
        questionChoiceA: 'Hi-Hat and Kick Drum',
        questionChoiceB: 'Kick drum and Snare',
        questionChoiceC: 'Hit-Hats and Toms',
        questionChoiceD: 'Kick Drum and Cymbals', 
        correctAnswer: 'Hi-Hat and Kick Drum'
    },
    {
        question: 'What is the name of this piece?',
        questionImage: '<img src="img/drum-throne.jpg">',
        questionChoiceA: 'Drum Seat',
        questionChoiceB: 'Drum Chair',
        questionChoiceC: 'Drum Stool',
        questionChoiceD: 'Drum Throne', 
        correctAnswer: 'Drum Throne'
    },
    {
        question: 'What is the best instrumnet to play in the world?',
        questionChoiceA: 'Drums',
        questionChoiceB: 'Piano',
        questionChoiceC: 'Electric Guitar',
        questionChoiceD: 'Bass Guitar', 
        correctAnswer: 'Drums'
    }
]
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
    if (quizState.questionIndex === 6){
        quizState.questionIndex = 0;
        return renderQuiz(quizState);

    } else {
        quizState.questionIndex++
        return renderQuiz(quizState);
    }
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

    // $('#drumQuiz').find('input').css('border', '1px solid red');
    console.log('reset');
    $('input[type=submit]').show();
    $('.nextButton').hide(); 
}

$(document).ready(function(){
    renderQuiz(quizState);
    addQuestionProgress(quizState);
    
    $('#drumQuiz').submit(function(event){
        event.preventDefault();

        var selectedAnswer = $('input:checked').val();
        var correctAnswer = quizState.questions[quizState.questionIndex].correctAnswer;

        if(selectedAnswer === correctAnswer){
            $('.message').addClass('correct').text("Correct!");
            $('input[type=submit]').hide();
            $('.nextButton').show(); 

            $('.nextButton').on('click', function(event){                
                resetQuestion();
                incrementQuestionIndex(quizState);
                addQuestionProgress(quizState);
            })
        } else {
            $('.message').addClass('error').text("Incorrect, Please try again!");
        }
    });
});