import "phaser";

import { config } from "../game";
import { Meteor } from "../prefabs/meteor"
import dataController from "../elementDataHandler";

export class GameScene extends Phaser.Scene {
  delta: number;
  lastMeteorTime: number;
  meteorsCaught: number;
  meteorsFallen: number;
  city: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;
  meteorGameData: IGameUnitDataSet<IGameElement>;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  async init(params) {
    this.delta = 1000;
    this.lastMeteorTime = 0;
    this.meteorsCaught = 0;
    this.meteorsFallen = 0;

    this.meteorGameData = await dataController.getExampleDataUnit();
    const pulledHTML = this.meteorGameData.gameElements[0].html;
    const domElement = this.add.dom(420, 60).createFromHTML(pulledHTML);
    console.log(pulledHTML);
    // domElement.addListener('click');
    // domElement.on('click', pulledClickFunc);
  }

  async preload() {
    this.load.path = "assets";
    this.load.image("city", "/sprites/city.png");
    this.load.image("meteor", "/sprites/meteor.png");
  }

  create() {
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
    // @ts-ignore reason: handwritten number
    const x = Phaser.Math.Between(25, config.width - 25);
    const y = 26;
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