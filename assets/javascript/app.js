// PREPARING THE DOCUMENT
$(document).ready(function() {
    console.log( "ready!" );

// GLOBAL VARIABLES
    var correctUserGuess = 0;
    var incorrectUserGuess = 0;
    var timer;
    var queNum1;
    var queNum2;
    var queNum3;
    var queNum4;
    var questionHolderArray;
    var currentQuestion;
    var usedQuestionArray = [];
    var userGuess;
    var correctAnswer;
    var submittedAnswer;
    var questionOrder;
    var arrayEmpty = false;
    var allowButtonClick = true;

// CLICK ON BUTTON TO BEGIN
    $("#startPage").click(function() {
        $('#startPage').hide();
        startGame();
    });

// START GAME
    function startGame () {
        // console.log("Start button function working");
        firstQuestionDisplay();
    }

// SHUFFLE FUNCTION (FISHER YATES)
    function fisherYates(myArray) {
        var i = myArray.length;
        if ( i === 0 ) return false;
        while ( --i ) {
            var j = Math.floor( Math.random() * ( i + 1 ) );
            var tempi = myArray[i];
            var tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }
        return myArray;
    }

// QUIZ QUESTIONS

    // OBJECT CONSTRUCTOR FUNCTION (GIVES FORMAT FOR QUESTIONS)
    function QuizQuestionFormat(questionNumber, question, answerA, answerB, answerC, answerD, correctAnswer,selectedAnswer) {
        this.questionNumber = questionNumber;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }

    queNum1 = new QuizQuestionFormat('1', 'Which "Jack was born in secret to a teenaged showgirl, raised to believe that his mother was his sister, and his grandmother was his mother?',
        'Jack Johnson (Musician)', 'Jack Nicholson (Actor)', 'Jack Dempsey (Boxer)', 'Jack Kerouac (Author)', 'Jack Nicholson (Actor)', '');
    queNum2 = new QuizQuestionFormat('2', 'Which “Jack” was accepted into a Wisconsin seminary and almost pursued the life of a priest?',
        'Jack the Ripper (Serial Killer)', 'Jack Kevorkian (Physician)', 'Jack White (Musician)', 'Jack London (Author)', 'Jack White (Musician)', '');
    queNum3 = new QuizQuestionFormat('3', 'Which “Jack” had parents that were both satellite engineers who worked on the Hubble Space Telescope?',
        'Jackie Collins (Romance Novelist)', 'Jack Johnson (Boxer)', 'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)', 'Jack Black (Comedian, Actor)', 'Jack Black (Comedian, Actor)', '');
    queNum4 = new QuizQuestionFormat('4', 'Which “Jack” is, in addition to English, also fluent in Italian, French, and Spanish?',
        'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)', 'Jackie Chan (Martial Artist, Actor)', 'Jack Nicklaus (Golfer)', 'Jack Osborne (Reality Television Star)', 'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)',)

    // SELECT A QUESTION
    function shuffleQuestions() {
        questionHolderArray = [queNum1, queNum2, queNum3, queNum4];
        questionOrder = fisherYates(questionHolderArray);
        console.log(questionOrder);
    }

// GENERATE AND DISPLAY A QUESTION
    function firstQuestionDisplay() {
        shuffleQuestions();
        currentQuestion = questionOrder[0];
        console.log(currentQuestion);
        $("#questionDiv").text(currentQuestion.question);
        $("#answerA").text(currentQuestion.answerA);
        $("#answerB").text(currentQuestion.answerB);
        $("#answerC").text(currentQuestion.answerC);
        $("#answerD").text(currentQuestion.answerD);
        modalGameContinuation();
    }

    function modalGameContinuation() {
        // REGISTERS ANSWER, AND RESPONDS ACCORDINGLY WITH CORRECT OR INCORRECT
        $(".button").click(function() {
            submittedAnswer = $(this).text();
            console.log(submittedAnswer);
            correctAnswer = currentQuestion.correctAnswer;
            console.log(correctAnswer);
            if (submittedAnswer === correctAnswer) {
                console.log("correct");
                winModal();
                setTimeout(function() {
                    newQuestion();
                }, 3000);
            } else {
                console.log("incorrect");
                loseModal();
                setTimeout(function() {
                    newQuestion();
                }, 3000);
            }
        });
    }

    function newQuestion() {
        questionOrder.shift();
        console.log(questionOrder);

        if (questionOrder === [-1]) {
            alert("game over");
        } else {
            currentQuestion = questionOrder[0];
            console.log(currentQuestion);
            $("#questionDiv").text(currentQuestion.question);
            $("#answerA").text(currentQuestion.answerA);
            $("#answerB").text(currentQuestion.answerB);
            $("#answerC").text(currentQuestion.answerC);
            $("#answerD").text(currentQuestion.answerD);
        }
    }

    // POP UP MODAL TO CONFIRM A CORRECT ANSWER
    function winModal() {
        $('#winModal').show();
        setTimeout(function() {
            $('#winModal').hide();
        }, 3000)
    }

    // POP UP MODAL TO CONFIRM AN INCORRECT ANSWER
    function loseModal() {
        $('#loseModal').show();
        setTimeout(function() {
            $('#loseModal').hide();
        }, 3000)
    }

});

