import "phaser";

export class Meteor extends Phaser.Physics.Arcade.Image {
  static imageKey = "meteor";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onClickCallback: VoidFunction,
  ) {
    super(scene, x, y, Meteor.imageKey);

    scene.add.existing(this);
    this.setDisplaySize(50, 50);
    this.setInteractive();
    this.on('pointerdown', this.onClick(onClickCallback));

    scene.physics.add.existing(this);
    this.body.setSize(50, 50);
    this.setVelocity(0, 200);
  }

  onClick(callback: VoidFunction): VoidFunction {
    return () => {
      this.setTint(0x00ff00);
      this.setVelocity(0, 0);
      callback();
    }
  }

  onFall(callback: VoidFunction): VoidFunction {
    return () => {
      this.setTint(0xff0000);
      callback();
    }
  }
}