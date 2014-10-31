myGame.GamePlay.prototype = {
  preload: function() {
    // Preload images for this state
  },

  create: function() {
    //A
    sounds[0] = game.add.audio('soundA');
  	sounds[0].addMarker('4', 0, .25);
  	sounds[0].addMarker('3', .25, .25);
  	sounds[0].addMarker('2', .5, .25);
  	sounds[0].addMarker('1', .75, .25);
  	sounds[0].addMarker('0', .9, .25);
    //B
    sounds[1] = game.add.audio('soundB');
  	sounds[1].addMarker('4', 0, .25);
  	sounds[1].addMarker('3', .25, .25);
  	sounds[1].addMarker('2', .5, .25);
  	sounds[1].addMarker('1', .75, .25);
  	sounds[1].addMarker('0', 1, .25);
    //C
    sounds[2] = game.add.audio('soundC');
  	sounds[2].addMarker('4', 0, .25);
  	sounds[2].addMarker('3', .25, .25);
  	sounds[2].addMarker('2', .5, .25);
  	sounds[2].addMarker('1', .75, .25);
  	sounds[2].addMarker('0', 1, .25);
    //D
    sounds[3] = game.add.audio('soundD');
  	sounds[3].addMarker('4', 0, .25);
  	sounds[3].addMarker('3', .25, .25);
  	sounds[3].addMarker('2', .5, .25);
  	sounds[3].addMarker('1', .75, .25);
  	sounds[3].addMarker('0', 1, .25);
    //E
    sounds[4] = game.add.audio('soundE');
  	sounds[4].addMarker('4', 0, .25);
  	sounds[4].addMarker('3', .25, .25);
  	sounds[4].addMarker('2', .5, .25);
  	sounds[4].addMarker('1', .75, .25);
  	sounds[4].addMarker('0', 1, .25);
    //F
    sounds[5] = game.add.audio('soundF');
  	sounds[5].addMarker('4', 0, .25);
  	sounds[5].addMarker('3', .25, .25);
  	sounds[5].addMarker('2', .5, .25);
  	sounds[5].addMarker('1', .75, .25);
  	sounds[5].addMarker('0', 1, .25);
    //G
    sounds[6] = game.add.audio('soundG');
  	sounds[6].addMarker('4', 0, .25);
  	sounds[6].addMarker('3', .25, .25);
  	sounds[6].addMarker('2', .5, .25);
  	sounds[6].addMarker('1', .75, .25);
  	sounds[6].addMarker('0', 1, .25);
    
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
    // score = 0;
//     scoreString = "score: "+ score;
//     var scoreStyle = {
//       font: "48px Mensch"
//       fill: "#666666"
//     };
//     scoreText = game.add.text(25, game.height-70, scoreString, scoreStyle);
    
    //Time string
    START_TIME = 180;
    timeLeft = START_TIME;
    
    this.convertTimeToString();
    var timeStyle = {
      font: "64px Mensch",
      fill: "#ffffff",
      align: "center"
    };
    timeText = game.add.text(game.width/2, 50, timeString, timeStyle);
    timeText.anchor.setTo(0.5);
    
    //  Create our Timer
    this.timer = this.time.create(false);
    this.timer.loop(1000, this.updateTimer, this);
    this.timer.start();
    
    // Instructions
    var instructionsStyle = {
      font: "48px Mensch",
      fill: "#333333",
      align: "right"
    };
    instructionText = game.add.text(game.width-25, game.height-26, "Open hand to play notes, make a fist to stop", instructionsStyle);
    instructionText.anchor.setTo(1);
    
    startRecording();
  },

  update: function() {
    timeText.setText(timeString);
    timeBox.width = (timeLeft/START_TIME) * game.width;
    timeBox.x = game.width - timeBox.width;
    
    // scoreString = "score: "+ score;
    // scoreText.setText(scoreString);
    
    var pinch1, pinch2;
    
    this.physics.arcade.overlap(circle1, notes, this.collisionHandler, null, this);
    this.physics.arcade.overlap(circle2, notes, this.collisionHandler, null, this);
    notes.forEach(this.checkCollisionState, this);
    
    if (hand1) {
      circle1.alpha = 0.7;
      circle1.x = (position1[0] * 3.5) + game.width/2;
      circle1.y = ((-position1[1] * 1.5) + game.height * .6) * 2;
    
      if (hand1.pinchStrength > .2 || hand1.grabStrength > .2) {
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
      circle2.x = (position2[0] * 3.5) + game.width/2;
      circle2.y = ((-position2[1] * 1.5) + game.height * .6) * 2;
    
      if (hand2.pinchStrength > .2 || hand2.grabStrength > .2) {
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
          noteY = 180 + (135 * j);
          colorString = "0x" + colorList[j];
          
          noteObject[j] = this.add.sprite(columnX, noteY, 'square');
          noteObject[j].tint = colorString;
          noteObject[j].anchor.setTo(0.5, 0.5);
          noteObject[j].columnNumber = i;
          noteObject[j].rowNumber = j;
          noteObject[j].normalColor = colorString;
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
        note.tint = "0xffffff";
        note.played = true;
        score += 1;
        
        //Using stringified variable doesn't seem to be working for marker...
        if (note.rowNumber == 0) {
          sounds[note.columnNumber].play('0');
        } else if (note.rowNumber == 1) {
          sounds[note.columnNumber].play('1');
        } else if (note.rowNumber == 2) {
          sounds[note.columnNumber].play('2');
        } else if (note.rowNumber == 3) {
          sounds[note.columnNumber].play('3');
        } else {
          sounds[note.columnNumber].play('4');
        }
      }
      noteScale.start();
      
      if (note.noteNumber) {
        textScale.start();
      }
    } else {
      note.played = false;
      note.tint = note.normalColor;
      noteScale.stop();
      if (note.noteNumber) {
        textScale.stop();
      }
    }
  },
  checkCollisionState: function(note) {
    if (!note.overlap(circle1) && !note.overlap(circle2)){
      note.played = false;
      note.tint = note.normalColor;
    }
  },
  updateTimer: function(game){
    if (timeLeft >0) {
      timeLeft--;
      console.log(timeLeft);
      this.convertTimeToString();
    } else {
      this.stopTimer();
    }
  },
  stopTimer: function(game) {
    this.timer.destroy();
    stopRecording();
    console.log("done");
    // this.state.start('MainMenu');
  },
  convertTimeToString: function(game) {
    var minutes = Math.floor((timeLeft) / 60);
    var seconds = timeLeft - (minutes * 60);

    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    timeString    = minutes +':'+ seconds;
    return timeString;
  }
}