$(document).ready(function() {
    // univeral vars
    var sound = document.createElement('audio');
    var correct = 0;
    var wrong = 0;
    var noGuess = 0;
    var time = 10;
    var userHasGuessed = false;
    var intervalId;
    var clockRunning = false;
    var index = 0;
    var theQuiz = [{
            question: "What planet does Borderlands 1 and 2 take place on",
            wrong1: "Earth",
            wrong2: "Mars",
            wrong3: "Jakku",
            correct: "Pandora",
            pic: "assets/images/pandora.webp",
            audio: "assets/audio/pandora.m4a"
        },
        {
            question: "Who is the founder of the Crimson Raiders",
            correct: "Roland",
            wrong1: "Lilith",
            wrong2: "Handsom Jack",
            wrong3: "Athena",
            pic: "assets/images/roland.webp",
            audio: "assets/audio/roland.m4a"
        },
        {
            question: "Who's famous line is No Refunds",
            wrong1: "Dr.Zed",
            correct: "Marcus",
            wrong2: "Moxi",
            wrong3: "Scooter",
            pic: "assets/images/marcus.gif",
            audio: "assets/audio/marcus.m4a"
        },
        {
            question: "Who is the FireHawk",
            correct: "Lilith",
            wrong1: "Brick",
            wrong2: "Guage",
            wrong3: "Zero",
            pic: "assets/images/lilith.gif",
            audio: "assets/audio/lilith.m4a"

        },
        {
            question: "How many sirens can exist at one time?",
            wrong1: "2",
            wrong2: "10",
            correct: "6",
            wrong3: "12",
            pic: "assets/images/siren.webp",
            audio: "assets/audio/siren.m4a"
        },
        {
            question: "What color are legendary guns",
            correct: "Orange",
            wrong1: "White",
            wrong2: "Blue",
            wrong3: "Green",
            pic: "assets/images/guns.gif",
            audio: "assets/audio/guns.m4a"
        },
        {
            question: "Which Borderlands game takes places on moon",
            wrong1: "Borderlands",
            wrong2: "Borderlands 2",
            correct: "The Pre-sequel",
            wrong3: "Borderlands 3",
            pic: "assets/images/pre-sequel.gif",
            audio: "assets/audio/moon.m4a"

        },
        {
            question: "Who ran Hyperion in Borderlands 2",
            wrong1: "Tannis",
            correct: "Handsome Jack",
            wrong2: "Tiny Tina",
            wrong3: "Flak",
            pic: "assets/images/jack.gif",
            audio: "assets/audio/jack.m4a"
        },
        {
            question: "Who really loves weapons that shoot exploding bullets",
            wrong1: "Typhon Deleon",
            wrong2: "Ellie",
            wrong3: "Hammerlock",
            correct: "Mr.Torgue",
            pic: "assets/images/torgue.gif",
            audio: "assets/audio/torgue.m4a"
        },
        {

            question: "Who is super general of the Crimsion Raiders savior of Pandora and the galaxies greatest hero",
            correct: "CLAP TRAP",
            pic: "assets/images/clap_trap.gif",
            audio: "assets/audio/claptrap.m4a"

        }
    ]
    $("#results").hide();
    $("#question").hide();
    // start game button 
    $("#start").on("click", function() {
            setUp();
            $("#buttons").hide();

        })
        // set up of each round
    function setUp() {
        var answer;
        if (index < theQuiz.length - 1) {
            $("#resultImg").empty();
            $("#results").hide();
            $("#timer").text("00:" + time);
            $("#timer").show();
            start();
            const values = Object.values(theQuiz[index])
            const keys = Object.keys(theQuiz[index]);
            $("#question").text(theQuiz[index].question);
            $("#question").show();
            for (var i = 1; i < 5; i++) {
                answer = $("<div>");
                answer.addClass("theAnswers");
                answer.attr("id", keys[i]);
                answer.text(values[i]);
                $("#answers").append(answer);
                $("#answers").show();
            }
        }
        if (index === theQuiz.length - 1) {
            console.log("test");
            $("#resultImg").empty();
            $("#results").hide();
            $("#timer").text("00:" + time);
            $("#timer").show();
            start();
            $("#question").text(theQuiz[index].question);
            $("#question").show();

            for (var j = 0; j < 4; j++) {
                answer = $("<div>");
                answer.addClass("theAnswers");
                answer.attr("data", "correct");
                answer.text(theQuiz[index].correct);
                $("#answers").append(answer);
                $("#answers").show();
            }
        }
        //right and wrong actions
        $(".theAnswers").on("click", function() {
            if (index === theQuiz.length - 1) {
                var winImg = $("<img>");
                winImg.addClass("pics");
                winImg.attr("src", theQuiz[index].pic);
                sound.setAttribute("src", theQuiz[index].audio);
                stop();
                $("#answers").empty();
                $("#question").hide();
                $("#resultImg").html(winImg);
                $("#results").html("Yayy you guess correctly " + theQuiz[index].correct + " is the right answer");
                $("#results").show();
                $("#resultImg").show();
                sound.play();
                userHasGuessed = true;
                index++;
                correct++;
                setTimeout(endTime, 1000 * 6);
            }
            if (this.id === "correct" && userHasGuessed === false) {
                var winImg = $("<img>");
                winImg.addClass("pics");
                winImg.attr("src", theQuiz[index].pic);
                sound.setAttribute("src", theQuiz[index].audio);
                stop();
                $("#answers").hide();
                $("#question").hide();
                $("#resultImg").html(winImg);
                $("#results").html("Yayy you guess correctly " + theQuiz[index].correct + " is the right answer");
                $("#results").show();
                $("#resultImg").show();
                sound.play();
                userHasGuessed = true;
                index++;
                correct++;
                setTimeout(waitTime, 1000 * 6);
            }
            if (this.id !== "correct" && userHasGuessed === false) {
                var loseImg = $("<img>");
                loseImg.addClass("pics");
                loseImg.attr("src", "assets/images/wrong_guess.webp");
                sound.setAttribute("src", "assets/audio/wrongguess.m4a");
                stop();
                $("#answers").hide();
                $("#question").hide();
                $("#resultImg").html(loseImg);
                $("#results").html("WRONGGGGGGGG " + theQuiz[index].correct + " was the right anwser");
                $("#results").show();
                $("#resultImg").show();
                sound.play();
                userHasGuessed = true;
                index++;
                wrong++;
                setTimeout(waitTime, 1000 * 6);
            }
        })
    }
    //what happens after your guess
    function nextQuestion() {
        userHasGuessed = false;
        time = 10;
        $("#timer").text("00:" + time);
        $("#answers").empty();
        $("#resultImg").empty();
        $("#results").empty();
        setUp();
    }
    //ends the game and then resets it when button is pressed
    function gameOver() {
        stop();
        var gameOverPic = $("<img>");
        gameOverPic.addClass("pics");
        gameOverPic.attr("src", )
        $("#buttons").show();
        $("#timer").hide();
        $("#resultImg").empty();
        $("#results").empty();
        if (correct > wrong && correct > noGuess) {
            gameOverPic.attr("src", "assets/images/game_over.gif");
            sound.setAttribute("src", "assets/audio/goodending.m4a");
            sound.play();
            $("#resultImg").html(gameOverPic);
            $("#results").html("You got so many questions right you need a life outside of Borderlands" + "<br>" + "The times you hit your shot: " + correct + "<br>" +
                "The times you totally missed your shot: " + wrong + "<br>" + "The times you didnt even shoot your shot: " + noGuess + "<br>" +
                "Press the start button to try again");
            $("#results").show();
            $("#resultImg").show();
        }
        if (wrong > correct && wrong > noGuess) {
            sound.setAttribute("src", "assets/audio/badending.m4a");
            sound.play();
            gameOverPic.attr("src", "assets/images/gameover_bad.gif");
            $("#resultImg").html(gameOverPic);
            $("#results").html("You got so many wrong so sad you need less of a life and more Borderlands" + "<br>" + "The times you hit your shot: " + correct + "<br>" +
                "The times you totally missed your shot: " + wrong + "<br>" + "The times you didnt even shoot your shot: " + noGuess + "<br>" +
                "Press the start button to try again");
            $("#results").show();
            $("#resultImg").show();
        }
        if (noGuess > wrong && noGuess > correct) {
            sound.setAttribute("src", "assets/audio/noguessending.m4a");
            sound.play();
            gameOverPic.attr("src", "assets/images/gameover_noguess.gif");
            $("#resultImg").html(gameOverPic);
            $("#results").html("You went AFK there for the whole game huh " + "<br>" + "The times you hit your shot: " + correct + "<br>" +
                "The times you totally missed your shot: " + wrong + "<br>" + "The times you didnt even shoot your shot: " + noGuess + "<br>" +
                "Press the start button to try again");
            $("#results").show();
            $("#resultImg").show();
        }
        userHasGuessed = false;
        time = 10;
        index = 0;
        correct = 0;
        wrong = 0;
        noGuess = 0;


    }
    //time lapse till next question
    function waitTime() {
        nextQuestion();
    }

    function endTime() {
        gameOver();
    }
    // the timer
    function start() {
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;

        }

    }

    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }
    // what occurs when the timer runs out
    function count() {
        time--;
        var converted = timeConverter(time);
        $("#timer").text(converted);
        if (index < theQuiz.length) {
            if (time === 0) {
                if (index === theQuiz.length - 1) {
                    var outOfTimePic = $("<img>");
                    sound.setAttribute("src", "assets/audio/noguess.m4a");
                    outOfTimePic.addClass("pics");
                    outOfTimePic.attr("src", "assets/images/to_long.gif");
                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(outOfTimePic);
                    $("#results").html("Well the questions wont get any easier so good luck " + "<br>" + theQuiz[index].correct + " was the right anwser");
                    $("#results").show();
                    $("#resultsImg").show();
                    sound.play();
                    index++;
                    noGuess++;
                    stop();
                    setTimeout(endTime, 1000 * 6);

                } else {
                    var outOfTimePic = $("<img>");
                    sound.setAttribute("src", "assets/audio/noguess.m4a");
                    outOfTimePic.addClass("pics");
                    outOfTimePic.attr("src", "assets/images/to_long.gif");
                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(outOfTimePic);
                    $("#results").html("Well the questions wont get any easier so good luck " + "<br>" + theQuiz[index].correct + " was the right anwser");
                    $("#results").show();
                    $("#resultsImg").show();
                    sound.play();
                    index++;
                    noGuess++;
                    stop();
                    setTimeout(waitTime, 1000 * 6);
                }
            }
        }
    }

    function timeConverter(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
})