window.addEventListener('load', function (event) {
  const AssetsManager = function () {
    this.set_image = undefined;
  };

  AssetsManager.prototype = {
    constructor: Game.AssetsManager,

    loadTileSetImage: function (url, callback) {
      this.set_image = new Image();

      this.set_image.addEventListener(
        'load',
        function (event) {
          callback();
        },
        { once: true }
      );

      this.set_image.src = url;
    },
  };

  var keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function () {
    display.resize(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      game.world.height / game.world.width
    );
    display.render();
  };

  var render = function () {
    display.fill(game.world.background_color);
    display.drawPlayer(
      game.world.player.x,
      game.world.player.y,
      game.world.player.width,
      game.world.player.height,
      assets_manager.set_image
    );
    display.render();
  };

  var update = function () {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.up.active) {
      game.world.player.jump();
      controller.up.active = false;
    }
    game.update();
  };

  var assets_manager = new AssetsManager();
  var controller = new Controller();
  var display = new Display(document.querySelector('canvas'));
  var game = new Game();
  var engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  assets_manager.loadTileSetImage('images/banana_man.png', () => {
    resize();
    engine.start();
  });

  window.addEventListener('keydown', keyDownUp);
  window.addEventListener('keyup', keyDownUp);
  window.addEventListener('resize', resize);

  resize();

  engine.start();
});
