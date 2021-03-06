myGame.EndState.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    //Fullscreen key
    key_L = game.input.keyboard.addKey(Phaser.Keyboard.L);
    key_L.onDown.add(myGame.gofullScreen);
    
    // Create objects
    myGame.drawBackgroundColor();
    myGame.drawOverlay(490);
    
    if (!singleScreen) {
      myGame.drawTitleText("Thanks!");
      myGame.drawSubTitleText("You are all \n wonderful people!");
    } else {
      myGame.drawTitleText("Great job!");
      myGame.drawSubTitleText("You played "+noteCount+" notes and\n beat the bass "+bassCount+" times.");
    }

    if (singleScreen) {
      this.retryButton = game.add.button(game.world.centerX - 150, game.world.height - 375, 'retryButton', this.startGame, this, 2, 1, 0);
    }
    
    //  Create our Timer
    this.timer = this.time.create(false);
    this.timer.loop(2000, myGame.changeBackgroundColor, this);
    this.timer.start();
    
  },
  update: function() {
    // Update objects & variables
  },
  startGame: function() {
    this.timer.destroy();
    this.state.start('PreGamePlay');
  }
}
