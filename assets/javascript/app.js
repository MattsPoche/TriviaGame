//on click events
$(document).ready(function(){
    
    class Question {
        constructor(questionText, answerChoices, correctAnswer){
            this.questionText = questionText;
            //this.numQuestion = numQuestion;
            this.answerChoices = answerChoices;
            this.correctAnswer = correctAnswer;
        }
        
        getQuestion(){
            return this.questionText;
        }
        getChoices(){
            return this.answerChoices;
        }
        getCorrectAnswer(){
            return this.correctAnswer;
        }
        getCorrectAnswerText(){
            return this.answerChoices[this.correctAnswer];
        }
    }
    
    function decrement(){
        $("#timeRemaining").text(timeLimit);
        if(timeLimit === 0){
            clearInterval(interval);
            state = gameState.OUTOFTIME;
            display();
        }
        timeLimit--;
    }
    
    function reset(){
        state = gameState.GAMESTART;
        gameState.questionNum = 0;
        gameState.cor = 0;
        gameState.wro = 0;
        $("#correct").text("");
        $("#wrong").text("");
        $("#choices").html("");
        display();
    }
    
    function startGame(){
        state = gameState.GUESS;
        display();
    }
    function nextQuestion(){
        state = gameState.Guess;
        $("#choices").html("");
        if(gameState.questionNum < questionList.length - 1){
            gameState.questionNum++;
            state = gameState.GUESS;
            display();
            
        }else{
            state = gameState.GAMEOVER;
            display();
        }
    }
    
    var gameState = {
        questionNum: 0,
        cor: 0,
        wro: 0,
        GAMESTART: "gamestart",
        GUESS: "guess",
        CORRECT: "correct",
        WRONG: "wrong",
        OUTOFTIME: "outoftime",
        GAMEOVER: "gameover"
    };
    
    
    function display(){
        switch(state){
            case gameState.GAMESTART:
                $("#question").text("Try to answer the questions correctly before your time is over!");
                clearInterval(interval);
                interval = setInterval(startGame, 5000);
                break;
            case gameState.GUESS:
                $("#question").text(questionList[gameState.questionNum].getQuestion());
                var choices = questionList[gameState.questionNum].getChoices();
                for(var i = 0; i < choices.length; i++){
                    var qdiv = $("<div>");
                    qdiv.addClass("choice");
                    qdiv.addClass("choicebutton")
                    qdiv.attr("data-index", i);
                    qdiv.text(choices[i]);
                    $("#choices").append(qdiv);
                }
                timeLimit = 10;
                clearInterval(interval);
                interval = setInterval(decrement, 1000);
                break;
            case gameState.CORRECT:
                $("#question").text("Correct!");
                $("#choices").html("");
                clearInterval(interval);
                interval = setInterval(nextQuestion, 5000);                
                break;
            case gameState.WRONG:
                $("#question").text("Wrong!");
                $("#choices").html("");
                $("#choices").append("<div class='choicebutton'>"+questionList[gameState.questionNum].getCorrectAnswerText()+"</div>");
                clearInterval(interval);
                interval = setInterval(nextQuestion, 5000);
                break;
            case gameState.OUTOFTIME:
                $("#question").text("Out of time!");
                $("#timeRemaining").text("0");
                $("#choices").html("");
                $("#choices").append("<div class='choicebutton'>"+questionList[gameState.questionNum].getCorrectAnswerText()+"</div>");
                clearInterval(interval);
                interval = setInterval(nextQuestion, 5000);
                break;
            case gameState.GAMEOVER:
                $("#question").text("Game Over!");
                $("#correct").text("Correct: "+gameState.cor);
                $("#wrong").text("Incorrect: "+gameState.wro);
                $("#choices").append("<div class='choicebutton' id='reset'>Click to try again</div");
                clearInterval(interval);
                break;
        }
    }
    
    
    //global vars
    var interval;
    var timeLimit = 10;
    var state = gameState.GAMESTART;
    //questions
    var questionList = [];
    questionList.push(new Question("The cradle of the Sumerian civilization was the delta of the Euphrates and Tigris rivers. In what modern-day nation is this located?", ["Turkey", "Greece", "Mongolia","Iraq"], 3));
    questionList.push(new Question("Of the 25 great civilizations, this was the most durable, lasting almost 4,000 years.", ["Greek", "Egyptian", "Phoenician","Harappa"], 1));
    questionList.push(new Question("The Indian (or Indus Valley) civilization was born around 2500 BC. It collapsed around 1500 BC when it was destroyed by invading ________.", ["Vandals", "Huns", "Aryans","Goths"], 2));
    questionList.push(new Question("The Minoan civilization, located in the Mediterranean Sea, lasted from 2000 to 1380 BC. In Minoan art, which animal symbolized the goddess?", ["Bull", "Bird", "Cow","Snake"], 3));
    questionList.push(new Question("The Hittite empire lasted from 1900-1200 BC. What was its capital?", ["Harappa", "Hattusas", "Laconia", "Cilicia"], 1));

    display();

    //onclick event
    $("div").on("click", "div.choice", function(){
        console.log("test");
        if(state === gameState.GUESS){
            if($(this).attr("data-index") === questionList[gameState.questionNum].getCorrectAnswer().toString()){
                gameState.cor++;
                clearInterval(interval);
                state = gameState.CORRECT;
            }else{
                gameState.wro++;
                clearInterval(interval);
                state = gameState.WRONG;
            }
            display();
        }
    });
    $("div").on("click", "div#reset", function(){
        reset();
    })
});