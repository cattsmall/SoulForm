myGame.GamePlay.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    //Sounds
    sounds[0] = game.add.audio('button');
    
    //Groups
    notes = game.add.group();
    circles = game.add.group();

    this.drawNotes();
    this.drawCircles();
    this.physics.arcade.collide(circles, notes);
    
    //Background box (score)
    boxBmp1 = this.add.bitmapData(game.width, game.height);
    boxBmp1.ctx.fillStyle = "#333333";
    boxBmp1.ctx.beginPath();
    boxBmp1.ctx.rect(0, 0, game.width, 100);
    boxBmp1.ctx.fill();
    
    timeBox = this.add.sprite(0,0, boxBmp1);
    
    //Background box (time)
    boxBmp2 = this.add.bitmapData(game.width, game.height);
    boxBmp2.ctx.fillStyle = "#111111";
    boxBmp2.ctx.beginPath();
    boxBmp2.ctx.rect(0, 0, game.width, 100);
    boxBmp2.ctx.fill();
    scoreBox = this.add.sprite(0,game.height-100, boxBmp2);
    
    //Score
    score = 0;
    scoreString = "score: "+ score;
    var scoreStyle = {
      fill: "#666666",
      font: "48px Mensch",
      fontWeight: 100
    };
    scoreText = game.add.text(25, game.height-70, scoreString, scoreStyle);
    
    //Time string
    timeLeft = 300;
    myGame.convertTimeToString();
    var timeStyle = {
      fill: "#ffffff",
      font: "64px Mensch",
      align: "center",
    };
    timeText = game.add.text(game.width/2, 50, timeString, timeStyle);
    timeText.anchor.setTo(0.5);
    
    //  Create our Timer
    timer = this.time.create(false);
    timer.loop(1000, myGame.updateTimer, this);
    timer.start();
  },

  update: function() {
    timeText.setText(timeString);
    timeBox.width = (timeLeft/300) * game.width;
    timeBox.x = game.width - timeBox.width;
    
    scoreString = "score: "+ score;
    scoreText.setText(scoreString);
    
    var pinch1, pinch2;
    
    this.physics.arcade.overlap(circle1, notes, this.collisionHandler, null, this);
    this.physics.arcade.overlap(circle2, notes, this.collisionHandler, null, this);
    notes.forEach(this.checkCollisionState, this);
    
    if (hand1) {
      circle1.alpha = 0.7;
      circle1.x = (position1[0] * 3.5) + game.width/2;
      circle1.y = (-position1[1] * 2) + game.height;
    
      if (hand1.pinchStrength > .6 || hand1.grabStrength > .6) {
        if (!tween1.isRunning) {
          tween1.start();
        }
        
        circle1.pinch = true;
      } else {
        if (!tween1big.isRunning) {
          tween1big.start();
        }
        
        circle1.pinch = false;
      }
    } else {
      circle1.alpha = 0.2;
    }
  
    if (hand2) {
      circle2.alpha = 0.7;
      circle2.x = (position2[0] * 3.5) + game.width/2 - 20;
      circle2.y = (-position2[1] * 2) + game.height;
    
      if (hand2.pinchStrength > .6 || hand2.grabStrength > .6) {
        if (!tween2.isRunning) {
          tween2.start();
        }
        
        circle2.pinch = true;
      } else {
        if (!tween2big.isRunning) {
          tween2big.start();
        }
        
        circle2.pinch = false;
      }
    } else {
      circle2.alpha = 0.2;
    }
  },
  drawCircles: function() {

    circle1 = this.add.sprite(game.width/2, game.height/2, 'circle');
    // circle1.tint = 0x666666;
    circle1.alpha = 0.2;
    circle1.anchor.setTo(0.5, 0.5);

    circle2 = this.add.sprite(game.width/2, game.height/2, 'circle');
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
    
    var noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
    
    // Horizontal
    for (var i = 0; i < 7; i++) {
       columnX = ((game.width/7) * i) + 102.5;
       var colorList = colors[i];
       
       //Vertical
       for (var j = 0; j < 5; j++) {
          noteY = 198 + (126 * j);
          colorString = "0x" + colorList[j];
          
          noteObject[j] = this.add.sprite(columnX, noteY, 'square');
          noteObject[j].tint = colorString;
          noteObject[j].anchor.setTo(0.5, 0.5);
          
          game.physics.enable(noteObject[j], Phaser.Physics.ARCADE);
          
          if (j == 4) {
            var noteStyle = {
              fill: "#ffffff",
              font: "72px Mensch",
              fontWeight: 100
            };
            noteText[i] = this.add.text(columnX, noteY+2, noteLetters[i], noteStyle);
            noteText[i].anchor.setTo(0.5, 0.5);
            noteText[i].alpha = 0.5;
            
            noteObject[j].noteNumber = i+1;
            if(noteObject[j].noteNumber){
            }
          }
          
          notes.add(noteObject[j]);
       }
    }
  },
  collisionHandler: function(circle, note) {
    noteScale = this.add.tween(note.scale).to({x:1.1, y:1.1}, 100).to({x:1, y:1}, 100);
    
    if (note.noteNumber) {
      textScale = this.add.tween(noteText[note.noteNumber-1].scale).to({x:1.25, y:1.25}, 100).to({x:1, y:1}, 100);
    }
        
    if (!circle.pinch) {
      if (!note.played) {
        note.played = true;
        score += 1;
        sounds[0].play();
      }
      noteScale.start();
      
      if (note.noteNumber) {
        textScale.start();
      }
    } else {
      note.played = false;
      noteScale.stop();
      if (note.noteNumber) {
        textScale.stop();
      }
    }
  },
  checkCollisionState: function(note) {
    if (!note.overlap(circle1) && !note.overlap(circle2)){
      note.played = false;
    }
  }
}
