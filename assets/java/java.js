$(document).ready(function() {
    // univeral vars
    var sound = document.createElement('audio');
    var correct = 0;
    var wrong = 0;
    var noGuess = 0;
    var time = 30;
    var userHasGuessed = false;
    var intervalId;
    var clockRunning = false;
    var time = 30;
    var index = 0;
    var theQuiz = [{
            question: "What planet does Borderlands 1 and 2 take place on",
            wrong1: "Earth",
            wrong2: "Mars",
            wrong3: "Jakku",
            correct: "Pandora",
            pic: "assets/images/pandora.webp"
        },
        {
            question: "Who is the founder of the Crimson Raiders",
            correct: "Roland",
            wrong1: "Lilith",
            wrong2: "Handsom Jack",
            wrong3: "Athena",
            pic: "assets/images/roland.webp"
        },
        {
            question: "Who's famous line is No Refunds",
            wrong1: "Dr.Zed",
            correct: "Marcus",
            wrong2: "Moxi",
            wrong3: "Skeeter",
            pic: "assets/images/marcus.gif"
        },
        {
            question: "Who is the FireHawk",
            correct: "Lilith",
            wrong1: "Brick",
            wrong2: "Guage",
            wrong3: "Zero",
            pic: "assets/images/lilith.gif"

        },
        {
            question: "How many sirens can exist at one time?",
            wrong1: "2",
            wrong2: "10",
            correct: "6",
            wrong3: "12",
            pic: "assets/images/siren.webp"
        },
        {
            question: "What color are legendary guns",
            correct: "Orange",
            wrong1: "White",
            wrong2: "Blue",
            wrong3: "Green",
            pic: "assets/images/guns.gif"
        },
        {
            question: "Which Borderlands game takes places on moon",
            wrong1: "Borderlands",
            wrong2: "Borderlands 2",
            correct: "Borderlands the Pre-sequel",
            wrong3: "Borderlands 3",
            pic: "assets/images/pre-sequel.gif"

        },
        {
            question: "Who ran Hyperion in Borderlands 2",
            wrong1: "Tannis",
            correct: "Handsome Jack",
            wrong2: "Tiny Tina",
            wrong3: "Flak",
            pic: "assets/images/jack.gif"
        },
        {
            question: "Who really loves weapons that shoot exploding bullets",
            wrong1: "Typhon Deleon",
            wrong2: "Ellie",
            wrong3: "Hammerlock",
            correct: "Mr.Torgue",
            pic: "assets/images/torgue.gif"
        },
        {
            question: "Whos is super general of the Crimsion Raiders savior of Pandora and the galaxies greatest hero",
            wrong1: "The ",
            wrong2: "One and",
            wrong3: "Only",
            correct: "CLAP TRAP",
            pic: "assets/images/clap_trap.gif"

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
        if (index < theQuiz.length) {
            $("#resultImg").empty();
            $("#results").hide();
            $("#timer").text("00:" + time);
            $("#timer").show();
            start();
            console.log("index is " + index);

            const values = Object.values(theQuiz[index])
            const keys = Object.keys(theQuiz[index]);
            $("#question").text(theQuiz[index].question);
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
                    winImg.attr("src", theQuiz[index].pic);

                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(winImg);
                    $("#results").html("Yayy you guess correctly " + theQuiz[index].correct + " is the right answer");
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
                    loseImg.attr("src", "assets/images/wrong_guess.webp");
                    stop();
                    $("#answers").hide();
                    $("#question").hide();
                    $("#resultImg").html(loseImg);
                    $("#results").html("WRONGGGGGGGG " + theQuiz[index].correct + " was the right anwser");
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
        if (index === theQuiz.length) {
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
        $("#buttons").show();
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
        if (index < theQuiz.length) {
            if (time === 0) {
                var outOfTimePic = $("<img>");
                outOfTimePic.addClass("pics");
                outOfTimePic.attr("src", "assets/images/to_long.gif");
                stop();
                $("#answers").hide();
                $("#question").hide();
                $("#resultImg").html(outOfTimePic);
                $("#results").html("Well the questions wont get any easier so good luck " + "<br>" + theQuiz[index].correct + " was the right anwser");
                $("#results").show();
                $("#resultsImg").show();
                index++;
                noGuess++;
                stop();
                setTimeout(waitTime, 1000 * 3);
            }
            if (index === theQuiz.length) {
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