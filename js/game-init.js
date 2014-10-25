// Declare global variables
var circle1, circle2, circles, notes,
    hand1, hand2, position, tween1, tween2, tween1big, tween2big,
    scoreBox, score, scoreString, scoreText, timeBox, timer, timeLeft, timeString, timeText;
    
var noteObject = [];
var noteText = [];
var sounds = [];


/* --- GOOGLE WEBFONT OBJECT --- */
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    google: {
      families: ['Yanone+Kaffeesatz']
    }

};

// Leap Gestures
var options = { enableGestures: true };

// Leap loop
Leap.loop(options, function(frame) {
  hand1 = frame.hands[0];
  hand2 = frame.hands[1];

  if (hand1) {
    position1 = hand1.palmPosition;
  }

  if (hand2) {
    position2 = hand2.palmPosition;
  }
});

// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay: function(game) {},
  EndState: function(game) {},
  updateTimer: function(game){
    if (timeLeft >=0) {
      timeLeft--;
      myGame.convertTimeToString();
    } else {
      myGame.stopTimer();
      this.state.start('GamePlay');
    }
  },
  stopTimer: function(game) {
    this.timer.destroy();
  },
  convertTimeToString: function(game) {
    var minutes = Math.floor((timeLeft) / 60);
    var seconds = timeLeft - (minutes * 60);

    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    timeString    = minutes +':'+ seconds;
    return timeString;
  }
};