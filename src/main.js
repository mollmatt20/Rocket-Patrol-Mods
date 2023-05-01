// Matthew Guo
// Rocket Patrol: Astral Space Edition
// Time it took to complete: 12 hours
// Mods implemented:
//  - Track a high score that persists across scenes and display it in the UI (5)
//  - Implement the 'FIRE' UI text from the original game (5)
//  - Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
//  - Implement the speed increase that happens after 30 seconds in the original game (5)
//  - Randomize each spaceship's movement direction at the start of each play (5)
//  - Create a new scrolling tile sprite for the background (5)
//  - Allow the player to control the Rocket after it's fired (5)
//  - Create 4 new explosion sound effects and randomize which one plays on impact (10)
//  - Display the time remaining (in seconds) on the screen (10)
//  - Create a new title screen (e.g., new artwork, typography, layout) (10)
//  - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
//  - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
//
// Citations:
// - https://freesound.org/people/holizna/sounds/629152/ for background music during play

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// set high score
let highScore = 0;