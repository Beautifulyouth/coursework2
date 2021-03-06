
class Restart extends Phaser.State {
  // 构造器
  constructor() {
    super("Restart");
  }

  create() {
    // 禁止物理引擎作用
    this.world.setBounds(0, 0, 0, 0);
    // 屏幕缩放
    const screenWidthRatio = gameOptions.width / 485;
    const screenHeightRatio = gameOptions.height / 645;
    // 生成sprite
    // 星星闪烁
    const skybox = this.add.sprite(0, 0, 'skybox');
    skybox.width = gameOptions.width;
    skybox.height = gameOptions.height;
    const twinkle = skybox.animations.add('twinkle');
    skybox.animations.play('twinkle', 3, true);
    // 空间站
    const station = this.add.sprite(gameOptions.width / 2, gameOptions.height / 1.9, 'station');
    station.scale.set(screenHeightRatio * 0.4);
    station.anchor.setTo(0.5, 0.5);
    this.add.tween(station).to(
      {rotation: Math.PI * 2}, 
      5000, 
      Phaser.Easing.Linear.Default, 
      true, 0, -1);
    // 下方火焰
    const fire = this.add.sprite(0, gameOptions.height * 0.98, 'fire');
    fire.width = gameOptions.width;
    this.add.tween(fire).to( 
      {y: gameOptions.height * 0.6}, 
      1000, 
      Phaser.Easing.Sinusoidal.InOut, 
      true, 0, -1, true);
    // GameOver
    const gameover = this.add.sprite(gameOptions.width / 2, 0, 'over');
    gameover.width *= 0.98 * screenWidthRatio;
    gameover.height *= 1.2 * screenHeightRatio;
		gameover.anchor.x = 0.5;
		this.add.tween(gameover).to( 
      {y: gameOptions.height / 3.5}, 
      1500, 
      Phaser.Easing.Bounce.Out, 
      true
    );
    // 得分
    const bestScore = localStorage.getItem('bestScore');
    const scoreText = this.add.text(
      50 * screenWidthRatio, 
      gameOptions.height / 4 * 2.7, 
      'Bureau score ' + gameOptions.score + '\nHighest score ' + bestScore, 
      { 
        font: "32px Arial", 
        fill: "#ffffff"
      }
    );
    scoreText.scale.set(screenWidthRatio);
    scoreText.anchor.x = 0;
    scoreText.anchor.y = 0.5;

    const restart = this.add.sprite(
      gameOptions.width - 80 * screenWidthRatio, 
      gameOptions.height / 4 * 2.7, 
      'restart'
    );
		restart.scale.setTo(0.4 * screenWidthRatio);
		restart.anchor.x = 0.5;
		restart.anchor.y = 0.5;
    restart.inputEnabled = true;
    restart.events.onInputDown.add(function () {
      this.restart();
    }, this);
  }

  restart() {
    this.state.start('game');
  }
}