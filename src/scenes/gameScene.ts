import "phaser";

import { config } from "../game";
import { Meteor } from "../prefabs/meteor"
import dataController from "../elementDataHandler";
import { IGameUnitDataSet } from "../elementDataHandler/data";

export class GameScene extends Phaser.Scene {
  delta: number;
  lastMeteorTime: number;
  meteorsCaught: number;
  meteorsFallen: number;
  city: Phaser.Physics.Arcade.StaticGroup;
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
    this.add.dom(600, 0).createFromHTML(questionElement);
    const sessionIdElement = this.meteorGameData.gameElements.sessionIdHTML.html;
    this.add.dom(100, 20).createFromHTML(sessionIdElement);
    const endSessionElement = this.meteorGameData.gameElements.endSessionHTML.html;
    this.add.dom(480, 20).createFromHTML(endSessionElement);
  }

  async preload() {
    this.load.path = "assets";
    this.load.image("city", "/sprites/city.png");
  }

  create() {
    this.city = this.physics.add.staticGroup({
      key: 'city',
      frameQuantity: 2
    });
    Phaser.Actions.PlaceOnLine(this.city.getChildren(),
      new Phaser.Geom.Line(245, 758, 1260, 758));
    this.city.refresh();
    // this.info = this.add.text(10, 10, 'sample text',
    //   { font: '24px Arial Bold', fill: '#FBFBAC' });
  }

  update(time: number): void {
  }
};
