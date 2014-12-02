myGame.PreGamePlay.prototype = {
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
    myGame.drawTitleText("Get ready...");
    myGame.drawSubTitleText("Put hands over the leap\nand get 2 circles onscreen");
    
    var tinyTextStyle = {
      font: "48px Mensch",
      fill: "#ffffff",
      align: "center"
    };
    tinyText = game.add.text(game.width/2, game.height - 100, "Make fists to prevent accidental sounds when you start!", tinyTextStyle);
    tinyText.anchor.setTo(0.5);
    
    //Circles
    circles = game.add.group();
    this.drawCircles();
    
    this.bothHandsVisible = false;
    this.hand1Visible = false;
    this.hand2Visible = false;
    
    //  Create our Timer
    this.timer = this.time.create(false);
    this.timer.loop(2000, myGame.changeBackgroundColor, this);
    this.timer.start();
  },

  update: function() {
    // Update objects & variables
    //hands
    if (hand1) {
      this.monitorHand(hand1, circle1, position1, tween1, tween1big);
    } else {
      circle1.visible = false;
    }
    
    if (hand2) {
      this.monitorHand(hand2, circle2, position2, tween2, tween2big);
    } else {
      circle2.visible = false;
    }
    
    if (circle1.visible && circle2.visible && !this.bothHandsVisible) {
      this.bothHandsVisible = true;
      titleText.setText("You're ready!");
      var countdownTime = 3;
      subTitleText.setText("Starting in "+ countdownTime);
      
      timer2 = window.setInterval(function () {
        //If circles are visible and timer is above zero
        if (countdownTime > 1 && circle1.visible && circle2.visible) {
          countdownTime--;
          subTitleText.setText("Starting in "+ countdownTime);
          
          //If circles are visible and timer is at 0
        } else if (countdownTime === 1 && circle1.visible && circle2.visible) {
          clearInterval(timer2);
          game.state.start('GamePlay');
        } else {
          clearInterval(timer2);
        }
      }, 1000);
    } else if ((this.bothHandsVisible && !circle1.visible) || (this.bothHandsVisible && !circle2.visible) || !circle1.visible || !circle2.visible) {
      this.bothHandsVisible = false;
      titleText.setText("Get ready...");
      subTitleText.setText("Put hands over the leap\nand get 2 circles onscreen");
      this.countdownTime = this.COUNTDOWN_START;
    }
  },
  monitorHand:function(hand, circle, position, smalltween, bigtween) {
    circle.visible = true;
    circle.x = (position[0] * 3.5) + game.width/2;
  
    if (hand.pinchStrength > .2 || hand.grabStrength > .2) {
      if (!smalltween.isRunning) {
        smalltween.start();
        circle.alpha = 0.6;
      }
      
      circle.pinch = true;
      circle.y = ((-position[1] * 1.5) + game.height * .5) * 2;
    } else {
      if (!bigtween.isRunning) {
        bigtween.start();
        circle.alpha = 0.8;
      }
      
      circle.pinch = false;
      circle.y = ((-position[1] * 1.5) + game.height * .49) * 2;
    }
    
    // console.log(hand);
  },
  drawCircles: function() {

    circle1 = this.add.sprite(-100, -100, 'circle');
    // circle1.tint = 0x666666;
    circle1.alpha = 0.2;
    circle1.anchor.setTo(0.5, 0.5);

    circle2 = this.add.sprite(-100, -100, 'circle');
    // circle2.tint = 0x666666;
    circle2.alpha = 0.2;
    circle2.anchor.setTo(0.5, 0.5);
    
    circles.add(circle1);
    circles.add(circle2);

  // Tweens
    tween1 = this.add.tween(circle1.scale).to({x:.5, y:.5}, 100);
    tween1big = this.add.tween(circle1.scale).to({x:1, y:1}, 100);
    tween2 = this.add.tween(circle2.scale).to({x:.5, y:.5}, 100);
    tween2big = this.add.tween(circle2.scale).to({x:1, y:1}, 100);
    
    game.physics.enable(circle1, Phaser.Physics.ARCADE);
    game.physics.enable(circle2, Phaser.Physics.ARCADE);
  }
}
