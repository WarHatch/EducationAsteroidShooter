import "phaser";

import { GameScene } from "./scenes/gameScene"

export const config: Phaser.Types.Core.GameConfig = {
  title: "Education Asteroid Shooter",
  width: 1024,
  height: 768,
  parent: "game",
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  dom: {
    createContainer: true,
    behindCanvas: false
  },
  backgroundColor: "#101752"
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  new Game(config);
};