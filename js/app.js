var allEnemies = [];
var player;
var blockWidth = 101;
var blockHeight = 83;
var debug = false;
var hud;
var lives = 3;
var level = 1;
var stop;

// Enemy constructor
var Enemy = function(horizontalPosition, verticalPosition, speed) {
    this.speed = speed;
    this.offset = 25;
    this.horizontalPosition = horizontalPosition;
    this.x = blockWidth * horizontalPosition;
    this.y = blockHeight * verticalPosition-this.offset;
    this.sprite = Resources.get('images/enemy-bug.png');
};



//Define enemy movement
Enemy.prototype.update = function(dt) {
    if (stop) {
        return;
    }
    if (this.x < ctx.canvas.width){
     this.x = this.x + this.speed * player.level;
    } else {
        this.x = blockWidth * this.horizontalPosition;
    };
   
};

// Draw the enemy
Enemy.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
    if (debug) {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.sprite.width, this.sprite.height);
        ctx.stroke();
    };
};

//Player constructor
var Player = function(horizontalPosition, verticalPosition, lives, level) {
    this.offset = 40;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
    this.sprite = Resources.get('images/char-boy.png');
    this.padding = 30;
    this.lives = lives;
    this.level = level;
    this.goToStart ();
};

//Set player to inital position
Player.prototype.goToStart = function() {
    this.x = blockWidth * this.horizontalPosition;
    this.y = blockHeight * this.verticalPosition - this.offset;
};

//Define player - enemy crash point and player level up point
Player.prototype.update = function() {   
    if (stop) {
        return;
    }
    var self = this;
    allEnemies.forEach(function (enemy){
        if ((enemy.x + enemy.sprite.width)>= (self.x + self.padding) && (enemy.x)<=( (self.x + self.padding) + (self.sprite.width - (self.padding*2)) ) && (enemy.y+enemy.offset)===(self.y+self.offset)){
            self.goToStart ();
            self.lives = self.lives - 1;
            if (self.lives === 0) {
                stop = true;
                alert("GAME OVER! TRY AGAIN!");
                document.location.reload();
            } else {
                self.goToStart();
            }
        }
    });
    if (this.y <= 0){
        this.goToStart ();
        this.level = this.level + 1;
    };
};

//Draw player
Player.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
    if (debug) {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "yellow";
        ctx.rect(this.x + this.padding, this.y + this.padding, this.sprite.width - (this.padding * 2), this.sprite.height - (this.padding * 2));
        ctx.stroke();
    };
};

//Player movements
Player.prototype.handleInput = function (key) {
  if (stop) {
        return;
  }
  if (key==='up' && this.y > 0) {
    this.y = this.y-blockHeight;
  }
  if (key==='down' && this.y < 5 * blockHeight - this.offset) {
    this.y = this.y+blockHeight;
  }
  if (key==='left' && this.x > 0) {
    this.x = this.x-blockWidth;
  }
  if (key==='right' && this.x < 4 * blockWidth) {
    this.x = this.x + blockWidth;
  }
};

// Head up display constructor and functions for the writing
var Hud = function (initialText,x,y) {
    this.text = initialText;
    this.x = x;
    this.y = y;
};

Hud.prototype.update = function () {
    this.text = '❤' + player.lives + '                         lvl' + player.level;
};

Hud.prototype.render = function () {
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.font = '48px Helvetica';
    ctx.fillText(this.text, this.x, this.y);
};

// Initiate objects
Resources.onReady(function() {
    stop = false;
    allEnemies.push(new Enemy(-1,1,1));
    allEnemies.push(new Enemy(-1,2,2));
    allEnemies.push(new Enemy(-1,3,3));
    player = new Player(2, 5, lives, level);
    hud = new Hud(lives + ' ' + level, 10, 0);
});

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
