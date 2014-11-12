myGame.Boot.prototype = {
  preload: function() {
    // Preload images for this state
    this.load.image('loadingImage', 'assets/images/loading.png');
  },

  create: function() {
    console.log("Boot");
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