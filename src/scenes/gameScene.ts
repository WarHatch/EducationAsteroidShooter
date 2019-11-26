import "phaser";

// Assets
const citySprite = require('../../assets/sprites/city.png');
const meteorSprite = require('../../assets/sprites/meteor.png');


export class GameScene extends Phaser.Scene {
  delta: number;
  lastMeteorTime: number;
  meteorsCaught: number;
  meteorsFallen: number;
  city: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }
  init(params): void {
    this.delta = 1000;
    this.lastMeteorTime = 0;
    this.meteorsCaught = 0;
    this.meteorsFallen = 0;
  }
  preload(): void {
    this.load.path = "assets";
    this.load.image("city", "/sprites/city.png");
    this.load.image("meteor", "/sprites/meteor.png");
  }

  create(): void {
    this.city = this.physics.add.staticGroup({
      key: 'city',
      frameQuantity: 2
    });
    // this.city = this.physics.add.staticGroup({
    //   key: 'meteor',
    //   frameQuantity: 2
    // });
    Phaser.Actions.PlaceOnLine(this.city.getChildren(),
      new Phaser.Geom.Line(245, 758, 1260, 758));
    this.city.refresh();
    this.info = this.add.text(10, 10, 'sample text',
      { font: '24px Arial Bold', fill: '#FBFBAC' });
  }
  update(time): void {
    // TODO
  }
};