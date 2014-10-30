// Declare global variables
var audio_context, recorder, 
    circle1, circle2, circles, notes,
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
function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');
  
  input.connect(audio_context.destination);
  console.log('Input connected to audio context destination.');
  
  recorder = new Recorder(input);
  console.log('Recorder initialised.');
}

function startRecording() {
  recorder && recorder.record();
  console.log('Recording...');
}

function stopRecording() {
  recorder && recorder.stop();
  console.log('Stopped recording.');
  
  // create WAV download link using audio data blob
  createDownloadLink();
  
  recorder.clear();
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement('div');
    var au = document.createElement('audio');
    var hf = document.createElement('a');

    var container = document.getElementById("gamecontainer");
    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    container.appendChild(li);
  });
}

// Declare myGame, the object that contains our game's states
var myGame = {
  //Define our game states
  Boot: function(game) {},
  Preload: function(game) {},
  MainMenu: function(game) {},
  GamePlay: function(game) {},
  EndState: function(game) {}
};