// Quiz State object
var quizState = {
   
}

var questions = [
    {
        question: 'In music, what instrument keeps the rythmn and tempo?',
        questionChoiceA: 'Piano',
        questionChoiceB: 'Drums',
        questionChoiceC: 'Bass Guitar',
        questionChoiceD: 'Metronome'
    },
    {
        question: 'What musical instrument can allow you to have a great workout while playing?',
        questionChoiceA: 'Drums',
        questionChoiceB: 'Guitar',
        questionChoiceC: 'Triangle',
        questionChoiceD: 'Zylophone',
    },
    {
        question: 'What part of the drumset can act as the metronome during a song?',
        questionChoiceA: 'Snare',
        questionChoiceB: 'Kick Drum',
        questionChoiceC: 'Cymbals',
        questionChoiceD: 'Hi-hats', 
    },
    {
        question: 'What is the name of this drum piece?',
        questionImage: '<img src="img/snare-drum.jpg">',
        questionChoiceA: 'Tom',
        questionChoiceB: 'Hi-Hat',
        questionChoiceC: 'Snare',
        questionChoiceD: 'Kick Drum', 
    },
    {
        question: 'Which parts of a drumset do you use your feet to make/alter a sound?',
        questionChoiceA: 'Hi-Hat and Kick Drum',
        questionChoiceB: 'Kick drum and Snare',
        questionChoiceC: 'Hit-Hats and Toms',
        questionChoiceD: 'Kick Drum and Cymbals', 
    },
    {
        question: 'What is the name of this piece?',
        questionImage: '<img src="img/drum-throne.jpg">',
        questionChoiceA: 'Drum Seat',
        questionChoiceB: 'Drum Chair',
        questionChoiceC: 'Drum Stool',
        questionChoiceD: 'Drum Throne', 
    },
    {
        question: 'What is the best instrumnet to play in the world?',
        questionChoiceA: 'Drums',
        questionChoiceB: 'Piano',
        questionChoiceC: 'Electric Guitar',
        questionChoiceD: 'Bass Guitar', 
    }
];

// var getQuestion = function(questionIndex){
//     var questionIndex = 0;
//     var firstQuestion = Object.values(questions[0].questionOne).join('');
// };



$(document).ready(function(){
    var questionIndex = 0;

    var questionAndChoices = function(){
        var questionTitle      = Object.values(questions[questionIndex].question).join('');
        var questionChoiceA    = Object.values(questions[questionIndex].questionChoiceA).join('');
        var questionChoiceB    = Object.values(questions[questionIndex].questionChoiceB).join('');
        var questionChoiceC    = Object.values(questions[questionIndex].questionChoiceC).join('');
        var questionChoiceD    = Object.values(questions[questionIndex].questionChoiceD).join('');

        $('.questionTitle').text(questionTitle);
        $('.inputA').text(questionChoiceA);
        $('.inputB').text(questionChoiceB);
        $('.inputC').text(questionChoiceC);
        $('.inputD').text(questionChoiceD);
    }
    questionAndChoices();
    

    $('#drumQuiz').submit(function(event){
        event.preventDefault();

        if (questionIndex === 6){
            questionIndex = 0;
            return questionAndChoices();
        } else {
            questionIndex++
            return questionAndChoices();
        }
        
        console.log('Submit');
    });
});