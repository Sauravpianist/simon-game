// alert("hi simon");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    // alert("You have click " + userChosenColour + " Box");

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
   var randomNumber = Math.floor(Math.random()*3);

   var randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColour);


}



function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

        setTimeout(() => {
            $("#"+currentColour).removeClass("pressed");
         }, 100); 
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

    if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);

     }
     } else {

     console.log("wrong");
     $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
         }, 200);
         var audio = new Audio("sounds/wrong.mp3");
         audio.play();
         $("#level-title").text("Game Over, Press Any Key to Restart");

         startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}



