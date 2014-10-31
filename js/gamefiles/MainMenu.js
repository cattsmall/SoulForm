myGame.MainMenu.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    console.log("MainMenu");
    this.startButton = game.add.button(game.world.centerX - 150, game.world.centerY - 150, 'startButton', this.startGame, this, 2, 1, 0);
    
  },

  update: function() {
    // Update objects & variables
  },
  startGame: function() {
    this.state.start('GamePlay');
  }
}
