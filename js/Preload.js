myGame.Preload.prototype = {
  preload: function() {
    // Preload images for this state
    this.load.image('square', 'assets/images/square.png');
    this.load.image('circle', 'assets/images/circle.png');
    
    //Fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
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
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.stage.smoothed = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('GamePlay');
  },
  update: function() {
    // Update objects & variables
  }
}
