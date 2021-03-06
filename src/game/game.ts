import "phaser";

import { AsteroidGameScene } from "./scenes/asteroidGameScene"
import { ICanvasDimension } from "../pages/helpers/pickCanvasSize";

export default class Game extends Phaser.Game {
  static defaultConfig: Phaser.Types.Core.GameConfig = {
    parent: "game",
    scene: [AsteroidGameScene],
    title: "Education Asteroid Shooter",

    backgroundColor: "#101752",
    dom: {
      behindCanvas: false,
      createContainer: true,
    },
    physics: {
      arcade: {
        debug: false
      },
      default: "arcade",
    }
  }

  constructor(canvasConfig: ICanvasDimension) {
    const { defaultConfig } = Game;
    super({
      ...defaultConfig,
      ...canvasConfig,
    });
    // setting HTMLCanvas id to match eduGame server requirements
    this.domContainer.id = "#htmlcanvas-edugame-script-0";
  }
}
