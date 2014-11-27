myGame.MainMenu.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    myGame.drawBackgroundColor();
    myGame.drawOverlay(450);
    myGame.drawTitleText("Soulform");
    myGame.drawSubTitleText("A musical experience");
    var tinyTextStyle = {
      font: "30px Mensch",
      fill: "#ffffff",
      align: "left"
    };
    tinyText = game.add.text(25, game.height - 50, "Created in 2014 by Catt Small - press L to go full screen", tinyTextStyle);
    tinyText.alpha = .5;
    
    this.startButton = game.add.button(game.world.centerX - 150, game.world.height - 395, 'startButton', this.startGame, this, 2, 1, 0);
    
    //  Create our Timer
    this.timer = this.time.create(false);
    this.timer.loop(2000, myGame.changeBackgroundColor, this);
    this.timer.start();
    
    key_L = game.input.keyboard.addKey(Phaser.Keyboard.L);
    key_L.onDown.add(myGame.gofullScreen);
  },

  update: function() {
    // Update objects & variables
  },
  startGame: function() {
    this.timer.destroy();
    this.state.start('PreGamePlay');
  }
}
