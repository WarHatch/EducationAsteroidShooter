import "phaser";

import dataController from "../../dataHandler";
import { IGameUnitDataSet } from "../../dataHandler/data";

export class AsteroidGameScene extends Phaser.Scene {
  static CITYKEY = "city";

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
      key: "AsteroidGameScene"
    });
  }

  async init(params) {
    this.meteorGameData = await dataController.getExampleDataUnit();
    const questionElement = this.meteorGameData.gameElements.questionHTML.html;
    this.add.dom(0, 0).createFromHTML(questionElement);
    // TODO: would make sense to add endGameSession button from here if I'm keeping phaser integration
  }

  async preload() {
    this.load.path = "assets";
    this.load.image(AsteroidGameScene.CITYKEY, "/sprites/city.png");
  }

  create() {
    this.city = this.physics.add.staticGroup({
      frameQuantity: 4,
      key: AsteroidGameScene.CITYKEY,
    });
    const { height: citySpriteHeight, width: citySpriteWidth } = this.game.textures.get(AsteroidGameScene.CITYKEY).source[0];
    // "setY": ... - citySpriteHeight/2

    const { height: canvasHeight, width: canvasWidth } = this.game.canvas;
    Phaser.Actions.PlaceOnLine(
      this.city.getChildren(),
      new Phaser.Geom.Line(citySpriteWidth/2, canvasHeight, canvasWidth, canvasHeight)
    );
    this.city.refresh();
  }

  update(time: number): void {
  }
};
