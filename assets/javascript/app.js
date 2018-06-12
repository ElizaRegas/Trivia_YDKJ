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

// IMAGES
    let jBlack = $('<img>', {
        id: 'jackBlack',
        src: 'assets/images/JackBlack.jpg',
        class: 'button',
        figcaption: 'JB',
        color: 'white'
    });

    let jChan = $('<img>', {
        id: 'jackieChan',
        src: 'assets/images/JackieChan.jpg',
        class: 'button'
    });

    let jCollins = $('<img>', {
        id: 'jackieCollins',
        src: 'assets/images/JackieCollins.jpg',
        class: 'button'
    });

    let jDempsey = $('<img>', {
        id: 'jackDempsey',
        src: 'assets/images/JackDempsey.jpg',
        class: 'button'
    });

    let jDorsey = $('<img>', {
        id: 'jackDorsey',
        src: 'assets/images/JackDorsey.jpg',
        class: 'button'
    });

    let jGleeson = $('<img>', {
        id: 'jackieGleeson',
        src: 'assets/images/JackieGleeson.jpg',
        class: 'button'
    });

    let jHanna = $('<img>', {
        id: 'jackHanna',
        src: 'assets/images/JackHanna.png',
        class: 'button'
    });

    let jJohnsonBoxer = $('<img>', {
        id: 'jackJohnsonBoxer',
        src: 'assets/images/JackJohnsonBoxer.jpg',
        class: 'button'
    });

    let jJohnsonMusician = $('<img>', {
        id: 'jackJohnsonMusician',
        src: 'assets/images/JackJohnsonMusician.jpg',
        class: 'button'
    });

    let jKerouac = $('<img>', {
        id: 'jackKerouac',
        src: 'assets/images/JackKerouac.jpg',
        class: 'button'
    });

    let jKevorkian = $('<img>', {
        id: 'jackKevorkian',
        src: 'assets/images/JackKevorkian.jpg',
        class: 'button'
    });

    let jLemmon = $('<img>', {
        id: 'jackLemmon',
        src: 'assets/images/JackLemmon.jpg',
        class: 'button'
    });

    let jLondon = $('<img>', {
        id: 'jackLondon',
        src: 'assets/images/JackLondon.jpg',
        class: 'button'
    });

    let jNicholson = $('<img>', {
        id: 'jackNicholson',
        src: 'assets/images/JackNicholson.jpg',
        class: 'button'
    });

    let jNicklaus = $('<img>', {
        id: 'jackNicklaus',
        src: 'assets/images/JackNicklaus.jpg',
        class: 'button'
    });

    let jOnassis = $('<img>', {
        id: 'jackieOnassis',
        src: 'assets/images/JackieOnassis.jpg',
        class: 'button'
    });

    let jOsbourne = $('<img>', {
        id: 'jackOsbourne',
        src: 'assets/images/JackOsbourne.jpg',
        class: 'button'
    });

    let jSparrow = $('<img>', {
        id: 'jackSparrow',
        src: 'assets/images/JackSparrow.jpg',
        class: 'button'
    });

    let jtheRipper = $('<img>', {
        id: 'jacktheRipper',
        src: 'assets/images/JacktheRipper.jpg',
        class: 'button'
    });

    let jWhite = $('<img>', {
        id: 'jackWhite',
        src: 'assets/images/JackWhite.jpg',
        class: 'button'
    });

// TIMER OBJECT
    let stopwatch = {

        time: 20,

        reset: function () {
            stopwatch.time = 20;
            $("#timerDiv").text("00:20");
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

            if (stopwatch.time <= 1) {
                clearInterval(intervalId);
                clockRunning = false;
                setTimeout(function() {
                    incorrectUserGuess++;
                    $("#incorrectCount").text(incorrectUserGuess);
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

    disablePause();
    disableButtons();

// CLICK ON BUTTON TO PAUSE
    $("#pause").click(function() {
        stopwatch.stop();
        $('#questionPageDiv').hide();
    });

// CLICK ON BUTTON TO RESUME
    $("#resume").click(function() {
        stopwatch.start();
        $('#questionPageDiv').show();
    });

// PAGE REFRESH
    function refreshPage() {
        refresh = setTimeout("location.reload(true);", 3000);
    }

// DISABLE BUTTONS
    function disableButtons() {
        $(".button").click(function(){
            return false;
        });
        $("#quizDiv").click(function(){
            return false;
        });
    }

    function disablePause() {
        $(".pauseResume").attr("disabled", true);
    }

// ENABLE BUTTONS
    function enableButtons() {
        $(".button").click(function(){
            return true;
        });
        $("#quizDiv").click(function(){
            return true;
        });
    }

    function enablePause() {
        $(".pauseResume").removeAttr("disabled", true);
    }

// CLICK ON BUTTON TO BEGIN
    $("#startPage").click(function() {
        $('#startPageDiv').hide();
        $('#questionPageDiv').show();
        startGame();
    });

// START GAME
    function startGame () {
        stopwatch.reset();
        stopwatch.start();
        enableButtons();
        console.log('buttons enabled');
        enablePause();
        $("#correctCount").text(correctUserGuess);
        $("#incorrectCount").text(incorrectUserGuess);
        firstQuestionDisplay();
    }

    function resetAnswerButtons() {
        $('.button').removeClass('winButton');
        $('.button').removeClass('loseButton');
        console.log('refresh buttons');
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
    function QuizQuestionFormat(question, answerA, answerB, answerC, answerD, correctAnswer,
                                answerAText, answerBText, answerCText, answerDText) {
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
        this.answerAText = answerAText;
        this.answerBText = answerBText;
        this.answerCText = answerCText;
        this.answerDText = answerDText;
    }

// QUESTION VARIABLES
    queNum1 = new QuizQuestionFormat('This “Jack” smashed up another driver’s Mercedes in a fit of road-rage with a two-iron.',
        jNicholson, jtheRipper, jGleeson, jDempsey, 'answerA',
        'Jack Nicholson<br>(Actor)', 'Jack the Ripper<br>(Serial Killer)', 'Jackie Gleeson<br>(Actor, Comedian)', 'Jack Dempsey<br>(Boxer)');
    queNum2 = new QuizQuestionFormat('This “Jack” was accepted into a Wisconsin seminary and almost pursued the life of a priest.',
        jOsbourne, jWhite, jBlack, jKevorkian, 'answerB',
        'Jack Osbourne<br>(Reality TV Star)', 'Jack White<br>(Musician)', 'Jack Black<br>(Actor, Comedian)', 'Jack Kevorkian<br>(Physician)');
    queNum3 = new QuizQuestionFormat('This “Jack” had parents who were both satellite engineers.',
        jDorsey, jOnassis, jJohnsonBoxer, jBlack, 'answerD',
        'Jack Dorsey<br>(Inventor, Programmer)', 'Jackie Onassis<br>(Former First Lady)', 'Jack Johnson<br>(Boxer)', 'Jack Black<br>(Actor, Comedian)');
    queNum4 = new QuizQuestionFormat('This multilingual, Emmy winning “Jack” edited Michael Jackson’s autobiography, Moonwalk.',
        jHanna, jNicholson, jLemmon, jOnassis, 'answerD',
        'Jack Hanna<br>(Conservationist)', 'Jack Nicholson<br>(Actor)', 'Jack Lemmon<br>(Actor)', 'Jackie Onassis<br>(Former First Lady)');
    queNum5 = new QuizQuestionFormat('This “Jack” is a former professional surfer.',
        jJohnsonMusician, jLemmon, jNicklaus, jCollins, 'answerA',
        'Jack Johnson<br>(Musician)', 'Jack Lemmon<br>(Actor)', 'Jack Nicklaus<br>(Golfer)', 'Jackie Collins<br>(Author)');
    queNum6 = new QuizQuestionFormat('This “Jack” also sings, having 20 albums to his credit.',
        jSparrow, jHanna, jChan, jOsbourne, 'answerC',
        'Jack Sparrow<br>(Fictional Pirate)', 'Jack Hanna<br>(Conservationist)', 'Jackie Chan<br>(Martial Artist)', 'Jack Osborne<br>(Reality TV Star)');
    queNum7 = new QuizQuestionFormat('Every single novel this “Jack” authored was a New York Times bestseller.',
        jKerouac, jLondon, jCollins, jDorsey, 'answerC',
        'Jack Kerouac<br>(Author)', 'Jack London<br>(Author)', 'Jackie Collins<br>(Author)', 'Jack Dorsey<br>(Inventor, Programmer)');
    queNum8 = new QuizQuestionFormat('This “Jack” overcame polio at the age of 13.',
        jJohnsonBoxer, jDempsey, jChan, jNicklaus, 'answerD',
        'Jack Johnson<br>(Boxer)', 'Jack Dempsey<br>(Boxer)', 'Jackie Chan<br>(Martial Artist)', 'Jack Nicklaus<br>(Golfer)');
    queNum9 = new QuizQuestionFormat('As a teen, this “Jack” worked as an oyster pirate, and was later arrested for vagrancy.',
        jLondon, jWhite, jJohnsonMusician, jGleeson, 'answerA',
        'Jack London<br>(Author)', 'Jack White<br>(Musician)', 'Jack Johnson<br>(Musician)', 'Jackie Gleeson<br>(Actor, Comedian)');
    queNum10 = new QuizQuestionFormat('In 1991, Johnny Depp paid $15,000 for a raincoat worn by this “Jack”.',
        jKevorkian, jKerouac, jSparrow, jtheRipper, 'answerB',
        'Jack Kevorkian<br>(Physician)', 'Jack Kerouac<br>(Author)', 'Jack Sparrow<br>(Fictional Pirate)', 'Jack the Ripper<br>(Serial Killer)');

// SELECT A QUESTION
    function shuffleQuestions() {
        questionHolderArray = [queNum1, queNum2, queNum3, queNum4, queNum5, queNum6, queNum7, queNum8, queNum9, queNum10];
        questionOrder = fisherYates(questionHolderArray);
        console.log(questionOrder);
    }

// GENERATE AND DISPLAY A QUESTION
    function firstQuestionDisplay() {
        shuffleQuestions();
        currentQuestion = questionOrder[0];
        console.log(currentQuestion);
        $("#questionDiv").text(currentQuestion.question);
        $("#answerA").html(currentQuestion.answerA);
        $("#answerB").html(currentQuestion.answerB);
        $("#answerC").html(currentQuestion.answerC);
        $("#answerD").html(currentQuestion.answerD);
        $("#answerAText").html(currentQuestion.answerAText);
        $("#answerBText").html(currentQuestion.answerBText);
        $("#answerCText").html(currentQuestion.answerCText);
        $("#answerDText").html(currentQuestion.answerDText);
    }
    modalGameContinuation();

// REGISTERS ANSWER, AND RESPONDS ACCORDINGLY WITH CORRECT OR INCORRECT
    function modalGameContinuation() {
        $(".button").click(function() {
            disableButtons();
            submittedAnswer = $(this).attr("id");
            console.log(submittedAnswer);
            correctAnswer = currentQuestion.correctAnswer;
            console.log(correctAnswer);
            highlightCorrectAnswer();
            stopwatch.stop();
            if (submittedAnswer === correctAnswer) {
                console.log("correct");
                correctUserGuess++;
                $("#correctCount").text(correctUserGuess);
                $(this).addClass('winButton');
                winModal();
                setTimeout(function() {
                    newQuestion();
                }, 5000);
            } else {
                console.log("incorrect");
                incorrectUserGuess++;
                $("#incorrectCount").text(incorrectUserGuess);
                $(this).addClass('loseButton');
                loseModal();
                setTimeout(function() {
                    newQuestion();
                }, 5000);
            }
        });
    }

// GENERATE NEW QUESTION
    function newQuestion() {
        disableButtons();
        questionOrder.shift();
        console.log(questionOrder);

        resetAnswerButtons();
        if (questionOrder.length === 0) {
            gameoverModal();
            setTimeout(function() {
                endgameModal();
            }, 3000);
        } else {
            currentQuestion = questionOrder[0];
            $("#questionDiv").text(currentQuestion.question);
            $("#answerA").html(currentQuestion.answerA);
            $("#answerB").html(currentQuestion.answerB);
            $("#answerC").html(currentQuestion.answerC);
            $("#answerD").html(currentQuestion.answerD);
            $("#answerAText").html(currentQuestion.answerAText);
            $("#answerBText").html(currentQuestion.answerBText);
            $("#answerCText").html(currentQuestion.answerCText);
            $("#answerDText").html(currentQuestion.answerDText);
            stopwatch.reset();
            stopwatch.start();
        }
    }

    function highlightCorrectAnswer() {

        if (currentQuestion.correctAnswer === 'answerA') {
            $('#answerA').addClass('winButton');
        }
        if (currentQuestion.correctAnswer === 'answerB') {
            $('#answerB').addClass('winButton');
        }
        if (currentQuestion.correctAnswer === 'answerC') {
            $('#answerC').addClass('winButton');
        }
        if (currentQuestion.correctAnswer === 'answerD') {
            $('#answerD').addClass('winButton');
        }
        else {
        }
    }

// POP UP MODAL TO CONFIRM A CORRECT ANSWER
    function winModal() {
        disableButtons();
        $('#winModal').show();
        setTimeout(function() {
            $('#winModal').hide();
        }, 5000);
    }

// POP UP MODAL TO CONFIRM AN INCORRECT ANSWER
    function loseModal() {
        disableButtons();
        $('#loseModal').show();
        setTimeout(function() {
            $('#loseModal').hide();
        }, 5000);
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
        disableButtons();
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

