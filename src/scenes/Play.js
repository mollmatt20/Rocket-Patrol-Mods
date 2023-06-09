class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('ufo', './assets/UFO.png');
        this.load.image('astral field', './assets/Astral Field.png');
        this.load.image('fire', './assets/fire_particles.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64,
        frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'astral field').setOrigin(0, 0);
        // add music during play
        var music = this.sound.add('music_background');
        music.setLoop('true');
        music.play();
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x4)
        let startPosition = (Math.random() < 0.5) ? 1 : -1;
        this.ship00 = new Spaceship(this, startPosition * (game.config.width + borderUISize*3), borderUISize*6, 'ufo', 0, 60, startPosition).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, startPosition * (game.config.width + borderUISize*6), borderUISize*4, 'spaceship', 0, 30, startPosition).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, startPosition * (game.config.width + borderUISize*3), borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, startPosition).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, startPosition * (game.config.width), borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, startPosition).setOrigin(0, 0);
        if (this.ship01.direction < 0) {
            this.ship01.setFlip(true, false)
        }
        if (this.ship02.direction < 0) {
            this.ship02.setFlip(true, false)
        }
        if (this.ship03.direction < 0) {
            this.ship03.setFlip(true, false)
        }
        // set ufo move speed as fastest one
        this.ship00.moveSpeed += 2;
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 60
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // Included FIRE text in UI
        scoreConfig.fixedWidth = 100;
        scoreConfig.backgroundColor = '#FFFFFF';
        scoreConfig.align = 'center';
        this.fireText = this.add.text(borderUISize + borderPadding*8, borderUISize + borderPadding*2, 'FIRE', scoreConfig);
        // Included high score in UI
        scoreConfig.align = 'left';
        scoreConfig.fixedWidth = 230;
        this.highScoreText = this.add.text(borderUISize + borderPadding*19, borderUISize + borderPadding*2, `High Score: ${highScore}`, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 120;
        this.timeInSeconds = Math.round(game.settings.gameTimer / 1000);
        this.timerText = this.add.text(borderUISize + borderPadding*42, borderUISize + borderPadding*2, `Time: ${this.timeInSeconds}`, scoreConfig)
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.game.sound.stopAll();
            this.gameOver = true;
            if (this.p1Score > highScore) {
                highScore = this.p1Score;
            }        
        }, null, this);

        // Time left displayed during play
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timeInSeconds > 0) {
                    this.timeInSeconds--;
                }
                this.timerText.setText(`Time: ${this.timeInSeconds}`);
            },
            callbackScope: this,
            loop: true
        });
    

        // 30-second ship speed up
        this.speedUp = this.time.delayedCall(30000, () => {
            this.ship00.moveSpeed += 2;
            this.ship01.moveSpeed += 2;
            this.ship02.moveSpeed += 2;
            this.ship03.moveSpeed += 2;
            this.p1Rocket.moveSpeed += 2;
        }, null, this);
    }   

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (this.ship01.direction > 0) {
            this.starfield.tilePositionX -= 4;
        } else {
            this.starfield.tilePositionX += 4;
        }
        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship00.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship00)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship00);
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height && 
        rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create particle at ship's position
        var particles = this.add.particles(ship.x, ship.y, 'fire', {
            duration: 100,
            frequency: 5,
            maxVelocityX: 50, 
            maxVelocityY: 50, 
            radial: true,
            speed: {random: [-100, 200]}
        });
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        particles.start();
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        var random_num = Phaser.Math.Between(1, 5);
        if (random_num == 1) {
            this.sound.play('new_explosion1');
        } else if (random_num == 2) {
            this.sound.play('new_explosion2');
        } else if (random_num == 3) {
            this.sound.play('new_explosion3');
        } else {
            this.sound.play('new_explosion4');
        }
    }
}