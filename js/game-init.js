// Declare global variables
var circle1, circle2, circles, notes,
    hand1, hand2, position, tween1, tween2, tween1big, tween2big,
    scoreBox, score, scoreString, scoreText, timeBox, timer, timeLeft, timeString, timeText, START_TIME,
    instructionText;
    
var noteObject = [];
var noteText = [];
var sounds = [];
var composition = []


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

// Recorder
window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });
};

// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Boot: function(game) {},
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay: function(game) {},
  EndState: function(game) {}
};