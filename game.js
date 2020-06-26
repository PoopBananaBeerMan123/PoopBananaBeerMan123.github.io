const Game = function () {
  this.world = {
    background_color: 'rgb(40,48,56)',

    friction: 0.95,
    gravity: 15,

    player: new Game.Player(),

    height: 720,
    width: 1280,

    checkCollision: function (object) {
      if (object.x < 0) {
        object.x = 0;
        object.velocity_x = 0;
      } else if (object.x + object.width > this.width) {
        object.x = this.width - object.width;
        object.velocity_x = 0;
      }
      if (object.y < 0) {
        object.y = 0;
        object.velocity_y = 0;
      } else if (object.y + object.height > this.height) {
        object.jumping = false;
        object.y = this.height - object.height;
        object.velocity_y = 0;
      }
    },

    update: function () {
      this.player.velocity_y += this.gravity;
      this.player.update();

      this.player.velocity_x *= this.friction;

      this.checkCollision(this.player);
    },
  };

  this.update = function () {
    this.world.update();
  };
};

Game.prototype = {
  constructor: Game,
};

Game.Player = function (x, y) {
  this.color = '#ff0000';
  this.height = 160;
  this.jumping = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.width = 160;
  this.x = 100;
  this.y = 50;
};

Game.Player.prototype = {
  constructor: Game.Player,

  jump: function () {
    if (!this.jumping) {
      this.jumping = true;
      this.velocity_y -= 100;
    }
  },

  moveLeft: function () {
    this.velocity_x -= 2;
  },
  moveRight: function () {
    this.velocity_x += 2;
  },

  update: function () {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },
};
