import "phaser";

import { GameScene } from "./scenes/gameScene"

const config: Phaser.Types.Core.GameConfig = {
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
  backgroundColor: "#18216D"
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  const game = new Game(config);
};