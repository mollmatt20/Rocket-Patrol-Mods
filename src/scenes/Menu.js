class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
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
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding*10, `High Score: ${highScore}`, menuConfig).setOrigin(0.5);
    
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