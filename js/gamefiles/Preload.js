myGame.Preload.prototype = {
  preload: function() {
    this.loadingImage = this.add.sprite( this.world.centerX, this.world.centerY, 'loadingImage');
    this.loadingImage.anchor.setTo(0.5);
    
    //Fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //Images
    this.load.image('square', 'assets/images/square.png');
    this.load.image('circle', 'assets/images/circle.png');
    
    //Buttons
    this.load.spritesheet('startButton', 'assets/images/startbutton.png', 300, 300);
    
    //Sound
    this.load.audio('button', [ 'assets/audio/button.mp3', 'assets/audio/button.wav' ]);
    this.load.audio('soundA', [ 'assets/audio/sound A.wav' ]);
    this.load.audio('soundB', [ 'assets/audio/sound B.mp3', 'assets/audio/sound B.wav' ]);
    this.load.audio('soundC', [ 'assets/audio/sound C.mp3', 'assets/audio/sound C.wav' ]);
    this.load.audio('soundD', [ 'assets/audio/sound D.mp3', 'assets/audio/sound D.wav' ]);
    this.load.audio('soundE', [ 'assets/audio/sound E.mp3', 'assets/audio/sound E.wav' ]);
    this.load.audio('soundF', [ 'assets/audio/sound F.mp3', 'assets/audio/sound F.wav' ]);
    this.load.audio('soundG', [ 'assets/audio/sound G.mp3', 'assets/audio/sound G.wav' ]);
  },

  create: function() {
    console.log("Preload");
    
    // recorder
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = (
      navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });
    this.state.start('MainMenu');
  },
  update: function() {
    // Update objects & variables
  }
}
