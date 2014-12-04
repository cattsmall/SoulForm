myGame.Preload.prototype = {
  preload: function() {
    // this.loadingImage = this.add.sprite( this.world.centerX, this.world.centerY, 'loadingImage');
    // this.loadingImage.anchor.setTo(0.5);
    this.add.text(game.width/2, game.height/2, "loading...", {font: "100px Mensch", fill: "#666666", align: "center"}).anchor.setTo(0.5);
      
    //Images
    this.load.image('square', 'assets/images/square.png');
    this.load.image('circle', 'assets/images/circle.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.spritesheet('heMan', 'assets/images/heman.png', 1300, 1080);
    
    //Buttons
    this.load.spritesheet('startButton', 'assets/images/startbutton.png', 300, 300);
    this.load.spritesheet('retryButton', 'assets/images/retrybutton.png', 300, 300);
    
    //Sounds
    this.load.audio('bassW', [ 'assets/audio/bass W.mp3', 'assets/audio/bass W.wav' ]);
    this.load.audio('bassA', [ 'assets/audio/bass A.mp3', 'assets/audio/bass A.wav' ]);
    this.load.audio('bassS', [ 'assets/audio/bass S.mp3', 'assets/audio/bass S.wav' ]);
    this.load.audio('bassD', [ 'assets/audio/bass D.mp3', 'assets/audio/bass D.wav' ]);

    this.load.audio('soundA', [ 'assets/audio/sound A.wav' ]);
    this.load.audio('soundB', [ 'assets/audio/sound B.mp3', 'assets/audio/sound B.wav' ]);
    this.load.audio('soundC', [ 'assets/audio/sound C.mp3', 'assets/audio/sound C.wav' ]);
    this.load.audio('soundD', [ 'assets/audio/sound D.mp3', 'assets/audio/sound D.wav' ]);
    this.load.audio('soundE', [ 'assets/audio/sound E.mp3', 'assets/audio/sound E.wav' ]);
    this.load.audio('soundF', [ 'assets/audio/sound F.mp3', 'assets/audio/sound F.wav' ]);
    this.load.audio('soundG', [ 'assets/audio/sound G.mp3', 'assets/audio/sound G.wav' ]);
  },

  create: function() {
    if (!singleScreen) {
      this.state.start('GamePlay');
    } else {
      this.state.start('MainMenu');
    }
  },
  update: function() {
    // Update objects & variables
  }
}
