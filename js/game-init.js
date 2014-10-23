// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay: function(game) {},
  EndState: function(game) {}
};

var circle1, circle2, circles, notes, hand1, hand2, position, tween1, tween2, tween1big, tween2big;
var noteObject = [];

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