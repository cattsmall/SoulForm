myGame.Preload.prototype = {
  preload: function() {
    // Preload images for this state
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
