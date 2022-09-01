const buttonColors = ["lime", "salmon", "purple", "blue"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;

$(".play").click(function () {
    userClickedPattern = [];
    gamePattern = [];
  level = 0;
  nextSequence();
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(150)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  var count = 0;
  for (i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      count++;
    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over");
        $(".play").text("Restart");
    }
    if (count === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } 
  }
}
