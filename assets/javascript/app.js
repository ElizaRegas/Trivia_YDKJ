// PREPARING THE DOCUMENT
$(document).ready(function() {
    console.log( "ready!" );

// GLOBAL VARIABLES
    let correctUserGuess = 0;
    let incorrectUserGuess = 0;
    let queNum1;
    let queNum2;
    let queNum3;
    let queNum4;
    let queNum5;
    let queNum6;
    let queNum7;
    let queNum8;
    let queNum9;
    let queNum10;
    let questionHolderArray;
    let currentQuestion;
    let correctAnswer;
    let submittedAnswer;
    let questionOrder;
    let clockRunning = false;
    let intervalId;
    let converted;
    let refresh;

// TIMER OBJECT
    let stopwatch = {

        time: 10,

        reset: function () {
            stopwatch.time = 10;
            $("#timerDiv").text("00:10");
        },

        start: function () {
            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },

        stop: function() {
            clearInterval(intervalId);
            clockRunning = false;
        },

        count: function () {
            stopwatch.time--;
            converted = stopwatch.timeConverter(stopwatch.time);
            console.log(converted);

            if (stopwatch.time <= 0) {
                clearInterval(intervalId);
                clockRunning = false;
                setTimeout(function() {
                    timeoutModal();
                }, 1000);
                setTimeout(function() {
                    newQuestion();
                }, 4000);
            }

            $("#timerDiv").text(converted);
        },

        timeConverter: function (t) {
            let minutes = Math.floor(t / 60);
            let seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        }
    };

// CLICK ON BUTTON TO BEGIN
    $("#startPage").click(function() {
        $('#startPageDiv').hide();
        $('#questionPageDiv').show();
        startGame();
    });

// PAGE REFRESH
    function refreshPage() {
        refresh = setTimeout("location.reload(true);", 3000);
    }

// START GAME
    function startGame () {
        stopwatch.reset();
        stopwatch.start();
        enable();
        $("#correctCount").text(correctUserGuess);
        $("#incorrectCount").text(incorrectUserGuess);
        firstQuestionDisplay();
    }

// SHUFFLE FUNCTION (FISHER YATES)
    function fisherYates(myArray) {
        let i = myArray.length;
        if ( i === 0 ) return false;
        while ( --i ) {
            let j = Math.floor( Math.random() * ( i + 1 ) );
            let tempi = myArray[i];
            let tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }
        return myArray;
    }

// OBJECT CONSTRUCTOR FUNCTION (GIVES FORMAT FOR QUESTIONS)
    function QuizQuestionFormat(question, answerA, answerB, answerC, answerD, correctAnswer) {
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }

// QUESTION VARIABLES
    queNum1 = new QuizQuestionFormat('This “Jack” smashed up another driver’s Mercedes in a fit of road-rage with a two-iron.',
        'Jack Nicholson (Actor)', 'Jack the Ripper (Serial Killer)', 'Jack Gleeson (Actor)', 'Jack Dempsey (Boxer)', 'Jack Nicholson (Actor)', '');
    queNum2 = new QuizQuestionFormat('This “Jack” was accepted into a Wisconsin seminary and almost pursued the life of a priest.',
        'Jack Osborne (Reality Television Star)', 'Jack White (Musician)', 'Jack Kevorkian (Physician)', 'Jack Black (Comedian, Actor)', 'Jack White (Musician)', '');
    queNum3 = new QuizQuestionFormat('This “Jack” had parents who were both satellite engineers.',
        'Jack Dorsey (Inventor, Computer Programmer)', 'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)', 'Jack Black (Comedian, Actor)', 'Jack Johnson (Boxer)', 'Jack Black (Comedian, Actor)', '');
    queNum4 = new QuizQuestionFormat('This multilingual, Emmy winning “Jack” edited Michael Jackson’s autobiography, Moonwalk.',
        'Jack Hanna (Conservationist, TV Personality)', 'Jack Nicholson (Actor)', 'Jack Lemmon (Actor)', 'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)', 'Jackie Kennedy Onassis (Former First Lady, Fashion Icon)',);
    queNum5 = new QuizQuestionFormat('This “Jack” is a former professional surfer.',
        'Jack Johnson (Musician)', 'Jack Lemmon (Actor)', 'Jack Nicklaus (Golfer)', 'Jackie Collins (Author)', 'Jack Johnson (Musician)', '');
    queNum6 = new QuizQuestionFormat('This “Jack” also sings, having 20 albums to his credit.',
        'Jack Hanna (Conservationist, TV Personality)', 'Jackie Chan (Martial Artist, Actor)', 'Jack Osborne (Reality Television Star)', 'Jack Sparrow (Fictional Pirate)', 'Jackie Chan (Martial Artist, Actor)', '');
    queNum7 = new QuizQuestionFormat('Every single novel this “Jack” authored was a New York Times bestseller.',
        'Jack Kerouac (Author)', 'Jack London (Author)', 'Jackie Collins (Author)', 'Jack Dorsey (Inventor, Computer Programmer)', 'Jackie Collins (Author)', '');
    queNum8 = new QuizQuestionFormat('This “Jack” overcame polio at the age of 13.',
        'Jack Johnson (Boxer)', 'Jack Dempsey (Boxer)', 'Jackie Chan (Martial Artist, Actor)', 'Jack Nicklaus (Golfer)', 'Jack Nicklaus (Golfer)', '');
    queNum9 = new QuizQuestionFormat('As a teen, this “Jack” worked as an oyster pirate, and was later arrested for vagrancy.',
        'Jack London (Author)', 'Jack White (Musician)', 'Jack Johnson (Musician)', 'Jack Gleeson (Actor)', 'Jack London (Author)', '');
    queNum10 = new QuizQuestionFormat('In 1991, Johnny Depp paid $15,000 for a raincoat worn by this “Jack”.',
        'Jack Sparrow (Fictional Pirate)', 'Jack Kerouac (Author)', 'Jack Kevorkian (Physician)', 'Jack the Ripper (Serial Killer)', 'Jack Kerouac (Author)', '');


// SELECT A QUESTION
    function shuffleQuestions() {
        questionHolderArray = [queNum1, queNum2, queNum3, queNum4, queNum5, queNum6, queNum7, queNum8, queNum9, queNum10];
        questionOrder = fisherYates(questionHolderArray);
        console.log(questionOrder);
    }

// DISABLE ANSWER BUTTONS
    function disable() {
        $(".button").attr("disabled",true);
    }

// ENABLE ANSWER BUTTONS
    function enable() {
        $(".button").removeAttr("disabled", true);
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

// REGISTERS ANSWER, AND RESPONDS ACCORDINGLY WITH CORRECT OR INCORRECT
    function modalGameContinuation() {
        $(".button").click(function() {
            submittedAnswer = $(this).text();
            console.log(submittedAnswer);
            correctAnswer = currentQuestion.correctAnswer;
            console.log(correctAnswer);
            stopwatch.stop();
            disable();
            if (submittedAnswer === correctAnswer) {
                console.log("correct");
                correctUserGuess++;
                $("#correctCount").text(correctUserGuess);
                winModal();
                setTimeout(function() {
                    enable();
                    newQuestion();
                }, 3000);
            } else {
                console.log("incorrect");
                incorrectUserGuess++;
                $("#incorrectCount").text(incorrectUserGuess);
                loseModal();
                setTimeout(function() {
                    enable();
                    newQuestion();
                }, 3000);
            }
        });
    }

// GENERATE NEW QUESTION
    function newQuestion() {
        questionOrder.shift();
        console.log(questionOrder);

        if (questionOrder.length === 0) {
            gameoverModal();
            setTimeout(function() {
                endgameModal();
            }, 3000);
        } else {
            currentQuestion = questionOrder[0];
            console.log(currentQuestion);
            $("#questionDiv").text(currentQuestion.question);
            $("#answerA").text(currentQuestion.answerA);
            $("#answerB").text(currentQuestion.answerB);
            $("#answerC").text(currentQuestion.answerC);
            $("#answerD").text(currentQuestion.answerD);
            stopwatch.reset();
            stopwatch.start();
        }
    }

// POP UP MODAL TO CONFIRM A CORRECT ANSWER
    function winModal() {
        $('#winModal').show();
        setTimeout(function() {
            $('#winModal').hide();
        }, 3000);
    }

// POP UP MODAL TO CONFIRM AN INCORRECT ANSWER
    function loseModal() {
        $('#loseModal').show();
        setTimeout(function() {
            $('#loseModal').hide();
        }, 3000);
    }

// POP UP MODAL TO CONFIRM A TIMEOUT
    function timeoutModal() {
        $('#timeoutModal').show();
        setTimeout(function() {
            $('#timeoutModal').hide();
        }, 3000);
    }

// POP UP MODAL TO CONFIRM A TIMEOUT
    function gameoverModal() {
        disable();
        $('#gameoverModal').show();
        setTimeout(function() {
            $('#gameoverModal').hide();
        }, 3000);
    }

// POP UP MODAL TO CONFIRM A TIMEOUT
    function endgameModal() {
        $('#endgameModal').show();
        setTimeout(function() {
            $('#endgameModal').hide();
        }, 3000);
        refreshPage();
    }

});

