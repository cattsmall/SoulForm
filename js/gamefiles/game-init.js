// Declare global variables
var audio_context, recorder, 
    circle1, circle2, circles, notes,
    hand1, hand2, position, tween1, tween2, tween1big, tween2big,
    key_W, key_A, key_S, key_D, cursors, bassW, bassA, bassS, bassD,
    stars, starScale, heMan1, heMan2, noteCount, bassCount,
    scoreBox, score, scoreString, scoreText, timeBox, timer, timer2, timeLeft, timeString, timeText, START_TIME,
    instructionText, titleText, subTitleText;
    
var noteObject = [];
var noteText = [];
var sounds = [];
var composition = [];
var colorBox = null;
var colorBoxOverlay = null;
var colors = [];
var noteLetters = ["C", "D","E", "F", "G", "A", "B"];

colors[0] = ["ff6700", "cc5200", "993e00", "662900", "331500"];
colors[1] = ["00ff00", "00e500", "00cc00", "00a500", "009200"];
colors[2] = ["ff2a00", "cc1d00", "991600", "660e00", "330700"];
colors[3] = ["0098ff", "0083cc", "006299", "004266", "002133"];
colors[4] = ["ff00e7", "cc00c2", "990092", "660061", "330031"];
colors[5] = ["ffce00", "e5b900", "d8ae00", "a38400", "7f6700"];
colors[6] = ["0000ff", "0000cc", "000099", "000066", "000033"];

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
  PreGamePlay: function(game) {},
  GamePlay: function(game) {},
  EndState: function(game) {},
  titleStyle: {
    font: "200px Mensch",
    fill: "#ffffff",
    align: "center"
  },
  drawTitleText: function(text) {
    titleText = game.add.text(game.width/2, 300, text, myGame.titleStyle);
    titleText.anchor.setTo(0.5);
  },
  subTitleStyle: {
    font: "84px Mensch",
    fill: "#666666",
    align: "center"
  },
  drawSubTitleText: function(text) {
    subTitleText = game.add.text(game.width/2, 475, text, myGame.subTitleStyle);
    subTitleText.anchor.setTo(0.5);
  },
  drawBackgroundColor: function() {
    var boxBmp = game.add.bitmapData(game.width, game.height);
    boxBmp.ctx.fillStyle = "#0098ff";
    boxBmp.ctx.beginPath();
    boxBmp.ctx.rect(0, 0, game.width, game.height);
    boxBmp.ctx.fill();
    colorBox = game.add.sprite(0,0, boxBmp);
  },
  drawOverlay: function(height) {
    var boxBmp = game.add.bitmapData(game.width, height);
    boxBmp.ctx.fillStyle = "#000000";
    boxBmp.ctx.beginPath();
    boxBmp.ctx.rect(0, 0, game.width, game.height);
    boxBmp.ctx.fill();
    colorBoxOverlay = game.add.sprite(0,140, boxBmp);
  },
  changeBackgroundColor:function(){
    var n = game.rnd.integerInRange(0, 6);
    var m = game.rnd.integerInRange(0, 4);
    
    var colorList = colors[n];
    var colorString = "0x" + colorList[m];
    
    var currentTint = colorBox.tint;
    
    colorBoxOverlay.alpha = .65;
    colorBox.alpha = 1;
    colorBox.tint = colorString;
  },
  gofullScreen: function() {
    game.scale.startFullScreen();
  }
};