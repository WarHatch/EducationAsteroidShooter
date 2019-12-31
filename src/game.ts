import "phaser";

import { GameScene } from "./scenes/gameScene"

export const config: Phaser.Types.Core.GameConfig = {
  parent: "game",
  scene: [GameScene],
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
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  new Game(config);
};