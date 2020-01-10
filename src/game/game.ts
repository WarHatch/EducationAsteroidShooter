import "phaser";

import { AsteroidGameScene } from "./scenes/asteroidGameScene"

export default class Game extends Phaser.Game {
  static defaultConfig: Phaser.Types.Core.GameConfig = {
    parent: "game",
    scene: [AsteroidGameScene],
    title: "Education Asteroid Shooter",

    height: 768,
    width: 1024,

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

  constructor() {
    super(Game.defaultConfig);
  }
}
