var points = 0;
var maxspeed = 1000;
var minspeed = 400;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500)
        this.x = this.x + this.speed * dt; 
    else {
        this.reset();
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}; 

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 101) && (this.x + 101 > allEnemies[i].x)) {
            this.back();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.back = function() {
    this.x = 200;
    this.y = 400;

};
Player.prototype.handleInput = function(button) {
    if (button == 'left') {
        if (this.x > 0) {
            this.x = this.x - 100;
        }
    } else if (button == 'right') {
        if (this.x < 400) {
            this.x = this.x + 100;
        }
    } else if (button == 'up') {
        if (this.y > 40) {
            this.y = this.y - 90;
        } else {
            console.log('bug');
          
            this.back();

        }
    } else if (button == 'down') {
        if (this.y < 400) {
            this.y = this.y + 90;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(50, 40),
    new Enemy(50, 130),
    new Enemy(50, 220)
];

var player = new Player(200, 400);

Enemy.prototype.reset = function() {
    this.x = -50;

};


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