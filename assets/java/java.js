$(document).ready(function() {
    // univeral vars
    var correct = 0;
    var wrong = 0;
    var noGuess = 0;
    var time = 30;
    // var gameOver = false;
    var userHasGuessed = false;
    var intervalId;
    var clockRunning = false;
    var time = 30;
    var index = 0;
    var theQuiz = {
        first: {
            question: "What planet does Borderlands 1 and 2 take place on",
            wrong1: "Earth",
            wrong2: "Mars",
            wrong3: "Jakku",
            correct: "Pandora",
            pic: "assets/images/Planet_Pandora.jpg"
        },
        second: {
            question: "Who is the founder of the Crimson Raiders",
            correct: "Roland",
            wrong1: "Lilith",
            wrong2: "Handsom Jack",
            wrong3: "Commandant Steele"
        },
        third: {
            question: "Who's famous line is No Refunds",
            wrong1: "Dr.Zed",
            correct: "Marcus",
            wrong2: "Moxi",
            wrong3: "Skeeter"
        }

    }

    var theGame = [theQuiz.first, theQuiz.second, theQuiz.third];

    // start game button 
    $("#start").on("click", function() {

            setUp();
            $("#start").hide();

        })
        // set up of each round
    function setUp() {
        if (index < theGame.length) {
            $("#resultImg").empty();
            $("#results").empty();
            $("#timer").text("00:" + time);
            $("#timer").show();
            start();
            console.log("index is " + index);

            const values = Object.values(theGame[index])
            const keys = Object.keys(theGame[index]);
            $("#question").text(theGame[index].question);
            $("#question").show();
            for (var i = 1; i < 5; i++) {

                var answer = $("<div>");
                answer.addClass("theAnswers");
                answer.attr("id", keys[i]);
                answer.text(values[i]);
                $("#answers").append(answer);
                $("#answers").show();
            }
            //right and wrong actions
            $(".theAnswers").on("click", function() {
                if (this.id === "correct" && userHasGuessed === false) {
                    var winImg = $("<img>");
                    winImg.addClass("pics");
                    winImg.attr("src", theGame[index].pic);

                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(winImg);
                    $("#results").html("<br>" + "Yayy you guess corectly " + theGame[index].correct + " is the right answer");
                    $("#results").show();
                    $("#resultImg").show();
                    userHasGuessed = true;
                    index++;
                    correct++;
                    setTimeout(waitTime, 1000 * 3);


                }
                if (this.id !== "correct" && userHasGuessed === false) {
                    var loseImg = $("<img>");
                    loseImg.addClass("pics");
                    loseImg.attr("src", "assets/images/wrong_guess.jpg");
                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(loseImg);
                    $("#results").html("WRONGGGGGGGG " + theGame[index].correct + " was the right anwser");
                    $("#results").show();
                    $("#resultImg").show();
                    userHasGuessed = true;
                    index++;
                    wrong++;
                    setTimeout(waitTime, 1000 * 3);
                    // console.log("wrong is " + wrong);

                }

            })
        }
        if (index === theGame.length) {
            gameOver();

        }


    }
    //what happens after your guess
    function nextQuestion() {
        userHasGuessed = false;
        time = 30;
        $("#timer").text("00:" + time);
        $("#answers").empty();
        $("#resultImg").empty();
        $("#results").empty();
        setUp();

    }

    function gameOver() {
        stop();
        var gameOverPic = $("<img>");
        gameOverPic.addClass("pics");
        gameOverPic.attr("src", )
        $("#start").show();
        $("#timer").hide();
        $("#resultImg").empty();
        $("#results").empty();

        gameOverPic.attr("src", "assets/images/game_over.gif");
        $("#resultImg").html(gameOverPic);
        $("#results").html("The times you hit your shot: " + correct + "<br>" +
            "The times you totally missed your shot: " + wrong + "<br>" + "The times you didnt even shoot your shot: " + noGuess + "<br>" +
            "Press the start button to try again");
        $("#results").show();
        $("#resultImg").show();
        userHasGuessed = false;
        time = 30;
        index = 0;
        correct = 0;
        wrong = 0;
        noGuess = 0;


    }
    //time lapse till next question
    function waitTime() {
        nextQuestion();
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

    function count() {
        time--;
        var converted = timeConverter(time);
        $("#timer").text(converted);
        if (index < theGame.length) {
            if (time === 0) {
                var outOfTimePic = $("<img>");
                outOfTimePic.addClass("pics");
                outOfTimePic.attr("src", "assets/images/to_long.gif");
                stop();
                $("#answers").hide();
                $("#question").hide();
                $("#resultImg").html(outOfTimePic);
                $("#results").html("Well the questions wont get any easier so good luck " + "<br>" + theGame[index].correct + " was the right anwser");
                $("#results").show();
                $("#resultsImg").show();
                index++;
                noGuess++;
                stop();
                setTimeout(waitTime, 1000 * 3);
            }
            if (index === theGame.length) {
                gameOver();

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