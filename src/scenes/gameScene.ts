import "phaser";

import dataController from "../elementDataHandler";
import { IGameUnitDataSet } from "../elementDataHandler/data";

export class GameScene extends Phaser.Scene {
  delta: number;
  lastMeteorTime: number;
  meteorsCaught: number;
  meteorsFallen: number;
  city: Phaser.Physics.Arcade.StaticGroup;
  shield: Phaser.GameObjects.Sprite;
  info: Phaser.GameObjects.Text;
  meteorGameData: IGameUnitDataSet;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  async init(params) {
    this.meteorGameData = await dataController.getExampleDataUnit();
    const questionElement = this.meteorGameData.gameElements.questionHTML.html;
    this.add.dom(724, 0).createFromHTML(questionElement);
    const endSessionElement = this.meteorGameData.gameElements.endSessionHTML.html;
    this.add.dom(480, 20).createFromHTML(endSessionElement);
  }

  async preload() {
    this.load.path = "assets";
    this.load.image("city", "/sprites/city.png");
    this.load.image("shield", "/sprites/shield_line.png");
  }

  create() {
    this.city = this.physics.add.staticGroup({
      frameQuantity: 2,
      key: 'city',
    });
    Phaser.Actions.PlaceOnLine(this.city.getChildren(),
      new Phaser.Geom.Line(245, 758, 1260, 758));
    this.city.refresh();
  }

  update(time: number): void {
  }
};
