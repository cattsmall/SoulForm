myGame.Boot.prototype = {
  preload: function() {
    // Preload images for this state
    // this.load.image('loadingImage', 'assets/images/loading.png');
    
    //Fonts
    // this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
  },

  create: function() {    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.stage.smoothed = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  },

  update: function() {
    // Update objects & variables
  }
}