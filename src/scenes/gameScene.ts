import "phaser";

import { config } from "../index";

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
    Phaser.Actions.PlaceOnLine(this.city.getChildren(),
      new Phaser.Geom.Line(245, 758, 1260, 758));
    this.city.refresh();
    this.info = this.add.text(10, 10, 'sample text',
      { font: '24px Arial Bold', fill: '#FBFBAC' });
  }

  update(time: number): void {
    var diff: number = time - this.lastMeteorTime;
    if (diff > this.delta) {
      this.lastMeteorTime = time;
      this.emitStar();
    }
    this.info.text =
      this.meteorsCaught + " caught - " +
      this.meteorsFallen + " fallen";
  }

  private onClick(meteor: Phaser.Physics.Arcade.Image): () => void {
    return function () {
      meteor.setTint(0x00ff00);
      meteor.setVelocity(0, 0);
      this.meteorsCaught += 1;
      this.time.delayedCall(100, function (star) {
        star.destroy();
      }, [meteor], this);
    }
  }
  private onFall(meteor: Phaser.Physics.Arcade.Image): () => void {
    return function () {
      meteor.setTint(0xff0000);
      this.meteorsFallen += 1;
      this.time.delayedCall(100, function (star) {
        star.destroy();
      }, [meteor], this);
    }
  }

  private emitStar(): void {
    var meteor: Phaser.Physics.Arcade.Image;
    // @ts-ignore
    var x = Phaser.Math.Between(25, config.width - 25);
    var y = 26;
    meteor = this.physics.add.image(x, y, "meteor");
    meteor.setDisplaySize(50, 50);
    meteor.setVelocity(0, 200);
    meteor.setInteractive();
    meteor.on('pointerdown', this.onClick(meteor), this);
    this.physics.add.collider(meteor, this.city,
      this.onFall(meteor), null, this);
  }
};