class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('start_screen', './assets/RP Start Screen.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('new_explosion1', './assets/disintegrating_explosion.wav');
        this.load.audio('new_explosion2', './assets/echo_explosion.wav');
        this.load.audio('new_explosion3', './assets/flamming_explosion.wav');
        this.load.audio('new_explosion4', './assets/slashing_explosion.wav');
        this.load.audio('music_background', './assets/Rocket Patrol Lofi.wav'); // load music during play
    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: '25px',
            color: '#000',
            align: 'right',
            fixedWidth: 0
        }

        this.startScreen = this.add.tileSprite(0, 0, 640, 480, 'start_screen').setOrigin(0, 0);
        // show menu text
        this.add.text(130, 35, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '25px';
        this.add.text(210, 430, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        this.add.text(220, 460, 'Use <--> arrows to move & (F) to fire', 
        menuConfig).setOrigin(0.5);
        this.add.text(540, 460, `High Score: ${highScore}`, menuConfig).setOrigin(0.5);
    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 10000    // Originally 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 1000    // Originally 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}