
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];
var gameOver = true;
var level = 0;
var clickCount = 0;
var highscore = 0;

$(document).keypress(function(){
  if (gameOver){
    advanceLevel();

  }
})
function startGame(){
  gameOver = false;
  level++;
  clickCount = 0;
  alert("Start Now");
  gamePattern = [];
  playerPattern = [];
  generatePattern();
}

$(".btn").click(function() {
  if(!gameOver){
  var color = $(this).attr("id");
  clickAction(color);
  playerPattern.push(color);
  clickCount++;
  stateChecker();
  }
});

function clickAction(color){
  var audio = new Audio("sounds/" + color +".mp3");
  audio.play();
  var button = $("#"+ color);
  button.addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function action(color){
    var audio = new Audio("sounds/" + color +".mp3");
    audio.play();
   }

function nextSequence(){
  setTimeout( function(){}, 100);
  var rand = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[rand];
  gamePattern.push(randomColor);
  setTimeout(function(){
    $("#"+ randomColor).fadeIn(50).fadeOut(50).fadeIn(50);}
    , 200)
  action(randomColor);
}

function gameIsOver(){
  gameOver = true;
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("You Lost, Press A Key to Play Again");
  level = 0;
  clickCount = 0;
  gamePattern = [];
  playerPattern = [];
}

function isEqual(first, second){
  var final = true;
  for(i = 0; i < first.length; i++){
    if (first[i] !== second[i]){
      final = false;}
  }
  return final;
}

function stateChecker(){
  if (!gameOver){
  var player = playerPattern.slice(0, clickCount);
  var game = gamePattern.slice(0, clickCount);
  if (!isEqual(player, game)){
    gameIsOver();
  }
  else if (clickCount == level){
    advanceLevel();
  }}
}


function advanceLevel(){
  gameOver = false;
  level++;
  if (level > highscore){
    highscore = level;
    $(".highscore").text("Best Score: " + highscore );
  }
  $("#level-title").text("Level " + level);
  clickCount = 0;
  playerPattern = [];
  nextSequence();

}



