myGame.Preload.prototype = {
  preload: function() {
    // Preload images for this state
    this.load.image('square', 'assets/images/square.png');
    this.load.image('circle', 'assets/images/circle.png');
    
    //Fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //Sound
    this.load.audio('button', [ 'assets/audio/button.mp3', 'assets/audio/button.wav' ]);
    this.load.audio('pen', [ 'assets/audio/pen.mp3', 'assets/audio/pen.wav' ]);
    this.load.audio('meow', [ 'assets/audio/meow.mp3', 'assets/audio/meow.wav' ]);
    this.load.audio('dice', [ 'assets/audio/dice.mp3', 'assets/audio/dice.wav' ]);
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
