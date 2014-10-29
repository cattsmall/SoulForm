myGame.Preload.prototype = {
  preload: function() {
    //Fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    var loadingStyle = {
      fill: "#999999",
      font: "100px Mensch",
      fontWeight: 100
    };
    this.loadingText = game.add.text(this.world.centerX, this.world.centerY, "Loading...", loadingStyle);
    this.loadingText.anchor.setTo(0.5);
    
    this.load.image('square', 'assets/images/square.png');
    this.load.image('circle', 'assets/images/circle.png');
    
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
    
    this.state.start('MainMenu');
  },
  update: function() {
    // Update objects & variables
  },
  changeText: function(text) {
  }
}
