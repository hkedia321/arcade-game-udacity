"use strict";
// Enemies our player must avoid
var Enemy = function(xcor, ycor, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xcor = xcor;
    this.ycor = ycor;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xcor += this.speed*dt;
    this.xcor = this.xcor>500?0:this.xcor;
    this.detectCrash();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xcor, this.ycor);
};

Enemy.prototype.detectCrash = function() {
    if (player.xcor + 26 <= this.xcor + 90 && player.xcor + 77 >= this.xcor + 10 && player.ycor + 130 >= this.ycor + 92 && player.ycor + 72 <= this.ycor + 132) {
        // player crash into bug
        document.getElementById("crashed").innerHTML = ++crashedTimes;
        restartGame();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xcor, ycor, speed) {
    this.xcor = xcor;
    this.ycor = ycor;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(xcorNew, ycorNew) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xcor, this.ycor);
};
Player.prototype.reset = function() {
    this.xcor = 200;
    this.ycor = 410;
    this.speed = 90;
};
Player.prototype.handleInput = function(keypressed) {
    if (keypressed == 'left') {
        this.xcor -= this.speed;
        if (this.xcor < 2) {
            this.xcor = 2;
        }
    } 
    else if (keypressed == 'right') {
        this.xcor += this.speed;
        if (this.xcor > 400) {
            this.xcor = 400;
        }
    } 
    else if (keypressed == 'up') {
        this.ycor -= this.speed;
        if (this.ycor <= (25)) { 
            gameWon();
            return;
        }
    }
    else if (keypressed == 'down') {
        this.ycor += this.speed;
        if (this.ycor > 410) { 
            this.ycor = 410;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(0, 0, 0);// values doesn't matter, change in reset function


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameWon() {
    player.reset();
    scoreNow += 1;
    document.getElementById("score").innerHTML = scoreNow;
    var probability = parseInt(Math.random()*10);
    if (probability < 5 && allEnemies.length < 5) {
        allEnemies.push(new Enemy(0,40 + Math.random()*100,40 + Math.random()*100));
    }
}

function restartGame() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0,40 + Math.random()*100,40 + Math.random()*100),
        new Enemy(0,60 + Math.random()*100,60 + Math.random()*100),
        new Enemy(5,50 + Math.random()*130,70 + Math.random()*100)
        );
}

var scoreNow = 0;
var crashedTimes = 0;
restartGame();
