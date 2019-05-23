var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameInProgress = false;
var sounds = [new Audio("sounds/red.mp3"), new Audio("sounds/blue.mp3"), new Audio("sounds/green.mp3"), new Audio("sounds/yellow.mp3")];
for (let s of sounds) {
  s.load();
}
var failSound = new Audio("sounds/wrong.mp3");
failSound.load();

$(".btn").click(function () {
  pushButton(this.id);
  setTimeout(function (color) {
    if (gameInProgress) {
      userClickedPattern.push(color);
      if (userClickedPattern.length === gamePattern.length) {
        if (userClickedPattern.toString() === gamePattern.toString()) {
          nextLevel();
        } else {
          gameOver();
        }
      } else {
        if (userClickedPattern.toString() === gamePattern.slice(0, userClickedPattern.length).toString()) {
        } else {
          gameOver();
        }
      }
    }
  }, 1000, this.id);
});

$(document).keypress(function () {
  if (!gameInProgress) {
    level = 0;
    gameInProgress = true;
    gamePattern = [];
    nextLevel();
  }
});

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () { $("body").removeClass("game-over"); }, 200);
  $("#level-title").text("😪 Game Over - Press any key to restart.");
  if (!failSound.ended) {
    failSound.pause();
    failSound.load();
  }
  failSound.play();
  gameInProgress = false;
}

function playButton(which) {
  var buttonSound = sounds[buttonColors.indexOf(which)];
  if (!buttonSound.ended) {
    buttonSound.pause();
    buttonSound.load();
  }
  sounds[buttonColors.indexOf(which)].play();
  $("#" + which).animate({opacity: 0}, 100).animate({opacity: 1}, 100);
}

function pushButton(which) {
  var buttonSound = sounds[buttonColors.indexOf(which)];
  if (!buttonSound.ended) {
    buttonSound.pause();
    buttonSound.load();
  }
  sounds[buttonColors.indexOf(which)].play();
  $("#" + which).addClass("pressed");
  setTimeout(function (which) { $("#" + which).removeClass("pressed"); }, 100, which);
}

function playPattern() {
  if (gamePattern.length > 0) {
    playButton(gamePattern[0]);
    for (var i = 1; i < gamePattern.length; i++) {
      setTimeout(function (index) { playButton(gamePattern[index]); }, 500 * i, i);
    }
  }
}

function nextLevel() {
  $("#level-title").removeClass("game-over");
  $("#level-title").text("Level " + (++level));
  gamePattern.push(buttonColors[Math.floor(Math.random() * 4)]);
  playPattern();
  userClickedPattern = [];
}
