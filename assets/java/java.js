$(document).ready(function() {
    var correct = 0;
    var wrong = 0;
    var noGuess = 0;
    var time = 30;
    var gameOver = false;
    var userHasGuessed = false;
    var index = 0
    var intervalId;

    var clockRunning = false;
    var time = 30;
    var theQuiz = {
        first: {
            question: "What planet does Borderlands 1 and 2 take place on",
            wrong1: "Earth",
            wrong2: "Mars",
            wrong3: "Jakku",
            correct: "Pandora"


        },
        second: {
            question: "Who is founder of the Crimson Raiders",
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
    // console.log(theGame[index].question);
    $("#start").on("click", function() {
        setUp();



    })

    function setUp() {
        start();
        userHasGuessed = false;
        const values = Object.values(theGame[index])
        const keys = Object.keys(theGame[index]);
        $("#question").text(theGame[index].question);
        for (var i = 1; i < values.length; i++) {
            var answer = $("<div>");
            answer.addClass("theAnswers");
            answer.attr("id", keys[i]);
            answer.text(values[i]);
            $("#answers").append(answer);


        }
        $(".theAnswers").on("click", function() {


            if (this.id === "correct" && userHasGuessed === false) {
                userHasGuessed = true;
                index++
                stop();
            }
            if (this.id !== "correct" && userHasGuessed === false) {
                userHasGuessed = true;
                console.log(userHasGuessed);
                index++
                stop();
            }

        })

    }

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