var allEnemies = [];
var blockWidth = 101;
var blockHeight = 83;
// Enemies our player must avoid
//DZ - stavi enemya na mapu!!
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
var Enemy = function(horizontalPosition, verticalPosition, speed) {
    this.speed = speed;
    this.offset = 25;
    this.horizontalPosition = horizontalPosition;
    this.x = blockWidth * horizontalPosition;
    this.y = blockHeight * verticalPosition-this.offset;
    this.sprite = 'images/enemy-bug.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width){
     this.x = this.x + this.speed;
    } else {
        this.x = blockWidth * this.horizontalPosition;
    }
   
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//konstruktor
var Player = function(horizontalPosition, verticalPosition) {
    this.offset = 40;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
    this.x = blockWidth * horizontalPosition;
    this.y = blockHeight * verticalPosition - this.offset;
    this.sprite = 'images/char-boy.png';
    this.threshold = 5;
};


Player.prototype.update = function() {
    var min = this.x - this.threshold;
    var max = this.x + this.threshold;
    var self = this;
    allEnemies.forEach(function (enemy){
        if (enemy.x > min && enemy.x < max && enemy.y+enemy.offset===self.y+self.offset){
            self.x = blockWidth * self.horizontalPosition;
            self.y = blockHeight * self.verticalPosition - self.offset;
        }
    })

        
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  if (key==='up' && this.y > 0) {
    this.y = this.y-blockHeight;
    //this.y -= blockHeight; ako je netko to napisao ošamariš ga
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
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies.push(new Enemy(-1,1,1));
allEnemies.push(new Enemy(-1,2,2));
allEnemies.push(new Enemy(-1,3,3));
var player = new Player(2,5);

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
