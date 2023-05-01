// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        // add to existing scene
        scene.add.existing(this);
        // store pointValue
        this.points = pointValue;
        // pixels per frame
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.direction = direction;
    }

    update() {
        if (this.direction > 0) {
            // move spaceship left
            this.x -= this.moveSpeed;
            // wrap around from left edge to right edge
            if (this.x <= 0 - this.width) {
                this.reset();
            }
        } 
        if (this.direction < 0) {
            // move spaceship right
            this.x += this.moveSpeed;
            // wrap around from right edge to left edge
            if (this.x >= game.config.width + this.width) {
                this.reset();
            }
        }
    }

    // position reset
    reset() {
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        } else {
            this.x = -(game.config.width);
        }
    }
}