myGame.GamePlay.prototype = {
  preload: function() {
    // Preload images for this state
    // this.load.spritesheet('character', 'assets/baddie.png', 32, 32);
  },

  create: function() {
    // Create objects
    console.log("GamePlay");
    
    //Groups
    notes = game.add.group();
    circles = game.add.group();
    
    this.drawNotes();
    this.drawCircles();
    
    // circles.bringToTop();
  },

  update: function() {
    if (hand1) {
      circle1.x = (position1[0] * 3) + game.width/2;
      circle1.y = (-position1[1] * 2) + game.height;
    
      // console.log(position1[0]);
      // console.log(position1[1]);
      // console.log(position1[2]);
    
      if (hand1.pinchStrength > .6 || hand1.grabStrength > .6) {
        if (!tween1.isRunning) {
          tween1.start();
        }
      } else {
        if (!tween1big.isRunning) {
          tween1big.start();
        }
      }
    }
  
    if (hand2) {
      circle2.x = (position2[0] * 3) + game.width/2 - 20;
      circle2.y = (-position2[1] * 2) + game.height;
    
      if (hand2.pinchStrength > .6 || hand2.grabStrength > .6) {
        if (!tween2.isRunning) {
          tween2.start();
        } else {
          circle2.scale.setTo(.5, 5);        
        }
      } else {
        if (!tween2big.isRunning) {
          tween2big.start();
        } else {
          circle2.scale.setTo(1, 1);
        }
      }
    }
  },
  drawCircles: function() {
  
    // Create BitmapData 1
    circleBmp1 = this.add.bitmapData(game.width, game.height);

    // Draw circle1
    circleBmp1.ctx.fillStyle = '#999999';
    circleBmp1.ctx.beginPath();
    circleBmp1.ctx.arc(game.width/2, game.height/2, 50, 0, Math.PI*2, true); 
    circleBmp1.ctx.closePath();
    circleBmp1.ctx.fill();
  
    // Put BitmapData in a Sprite 1
    circle1 = this.add.sprite(game.width/2, game.height/2, circleBmp1);
    circle1.anchor.setTo(0.5, 0.5);
  
    // Create BitmapData 2
    circleBmp2 = this.add.bitmapData(game.width, game.height);

    // Draw circle2
    circleBmp2.ctx.fillStyle = '#ff9900';
    circleBmp2.ctx.beginPath();
    circleBmp2.ctx.arc(game.width/2, game.height/2, 50, 0, Math.PI*2, true); 
    circleBmp2.ctx.closePath();
    circleBmp2.ctx.fill();
  
    // Put BitmapData in a Sprite 2
    circle2 = this.add.sprite(game.width/2, game.height/2, circleBmp2);
    circle2.anchor.setTo(0.5, 0.5);
    
    circles.add(circle1);
    circles.add(circle2);
  
    //Collision
    // this.physics.arcade.enable(circle1);
    // this.physics.arcade.enable(circle2);
    // circle1.body.collideWorldBounds = true;
    // circle2.body.collideWorldBounds = true;

  // Tweens
    tween1 = this.add.tween(circle1.scale).to({x:.5, y:.5}, 100);
    tween1big = this.add.tween(circle1.scale).to({x:1, y:1}, 100);
    tween2 = this.add.tween(circle2.scale).to({x:.5, y:.5}, 100);
    tween2big = this.add.tween(circle2.scale).to({x:1, y:1}, 100);
  },
  drawNotes: function() {
    console.log("hi");
    var noteBmp = [];
    var columnX, noteY;
    
    var colors = [];
    colors[0] = ["0098ff", "0083cc", "006299", "004266", "002133"];
    colors[1] = ["ff00e7", "cc00c2", "990092", "660061", "330031"];
    colors[2] = ["ffce00", "e5b900", "d8ae00", "a38400", "7f6700"];
    colors[3] = ["0000ff", "0000cc", "000099", "000066", "000033"];
    colors[4] = ["ff6700", "cc5200", "993e00", "662900", "331500"];
    colors[5] = ["00ff00", "00e500", "00cc00", "00a500", "009200"];
    colors[6] = ["ff2a00", "cc1d00", "991600", "660e00", "330700"];
    
    // Horizontal
    for (var i = 0; i < 7; i++) {
       columnX = ((game.width/7) * i) + 18;
       console.log(columnX);
       
       //Vertical
       for (var j = 0; j < 5; j++) {
          noteY = 90 + (124 * j);
          
          // Create BitmapData 1
          noteBmp[j] = this.add.bitmapData(game.width, game.height);

          // Draw circle1
          noteBmp[j].ctx.fillStyle = '#999999';
          noteBmp[j].ctx.beginPath();
          noteBmp[j].ctx.rect(columnX, noteY, 170, 100); 
          noteBmp[j].ctx.fill();
          
          noteObject[j] = this.add.sprite(game.width/2, game.height/2, noteBmp[j]);
          noteObject[j].anchor.setTo(0.5, 0.5);
          
          notes.add(noteObject[j]);
       }
    }
  }
}
