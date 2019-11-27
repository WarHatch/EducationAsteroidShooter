import "phaser";

import { config } from "../index";
import { Meteor } from "../prefabs/meteor"

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
      this.spawnMeteor();
    }
    this.info.text =
      this.meteorsCaught + " caught - " +
      this.meteorsFallen + " fallen";
  }

  private spawnMeteor(): void {
    // @ts-ignore
    var x = Phaser.Math.Between(25, config.width - 25);
    var y = 26;
    const destroyDelay = 200;
    const meteor = new Meteor(
      this, x, y,
      () => {
        this.meteorsCaught += 1;
        this.time.delayedCall(destroyDelay, (m: Meteor) => {
          m.destroy();
        }, [meteor], this);
      }
    );
    this.physics.add.collider(meteor, this.city,
      meteor.onFall(() => {
        this.meteorsFallen += 1;
        this.time.delayedCall(destroyDelay, (m: Meteor) => {
          m.destroy();
        }, [meteor], this);
      }), null, this);
  }
};