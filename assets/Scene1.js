class Scene1 extends Phaser.Scene {

    constructor() {
        super({
            key: "Scene1"
        })
    }


    preload() {
        this.load.image('splash', './assets/backgroundbackground.png')
        this.load.atlas('player', './assets/sprites.png', './assets/sprites.json')
        this.load.image('level_1', './assets/maps/tilesheet_cave.png')
        this.load.tilemapTiledJSON('map2', '/assets/maps/real.json')
        this.load.tilemapTiledJSON('map', './assets/maps/level_1.json')
        this.load.atlas('bomb', './assets/bomb.png', './assets/bomb.json')
        this.load.atlas('player2', './assets/player2.png', './assets/player2.json')
        this.load.json('levels', './assets/levels.json')
        this.load.image('bg', './assets/bg.png')
        this.load.atlas('expand', './assets/bomb_explosion.png', './assets/bomb_explosion.json')
        this.load.audio('defeat', './assets/defeated.mp3')
        this.load.audio('explode', './assets/bombsound.mp3')
        this.load.image('powerup', './assets/powerup.png')
    }

    create() {
        // let splash = this.add.sprite(600,500, 'splash')
        // splash.depth = -3
        
        this.powerUpActive = false
        this.deathCount = 0
        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
            fontFamily: "Roboto Condensed",
            color: "#ffffff",
            fontSize: '30px'
        })
        this.deathCounter.onWorldBounds = false
        this.input.keyboard.addKeys("W", "A", "S", "D")
        this.cameras.main.centerOn(400, 300)
        window.otherPlayer = this.otherPlayer
        window.player = this.player
        window.bomb = this.bomb
        console.log(this)
        var self = this;
        this.otherPlayer = this.physics.add.sprite(300, 400, 'player2')
        this.player = this.physics.add.sprite(300, 400, 'player')
        this.socket = io();
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                }
            });
        });
        this.powerup = self.physics.add.image(400, 400, 'powerup')
        this.powerup.immovable = true

        function addPlayer(self, playerInfo) {

            // self.physics.add.collide(player, rocks)

            self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0)
            self.player.setCollideWorldBounds(true);
            self.player.onWorldBounds = true;
            self.physics.add.collider(self.player, self.rocks)

            self.physics.add.collider(self.powerup, self.player, () => {
                self.powerUpActive = true
                self.powerup.visible = false
                self.powerup.active = false
                self.socket.emit(
                    'powerup', {
                        x: self.player.x,
                        y: self.player.y
                    }
                )
                self.time.delayedCall(6000, () => {
                    self.powerUpActive = false
                    self.powerup.active = true
                    self.powerup.visible = true
                    self.powerup.x = 400
                    self.powerup.y = 400
                    self.powerup.setVelocityX(0)
                    self.powerup.setVelocityY(0)
                    self.powerup.immovable = true

                })
            })
            // self.physics.add.collider(self.player, otherPlayer)
        }

        this.otherPlayers = this.physics.add.group();
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                } else {
                    addOtherPlayers(self, players[id]);
                }
            });
        });
        this.socket.on('newPlayer', function (playerInfo) {
            addOtherPlayers(self, playerInfo);
        });
        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });

        function addOtherPlayers(self, playerInfo) {
            self.otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player2')
            self.otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(self.otherPlayer);


        }


        this.anims.create({
            key: 'up',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 21,
                end: 23,
                zeroPad: 2
            })
        })

        this.anims.create({
            key: 'left',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 15,
                end: 17,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 18,
                end: 20,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 6,
                end: 10,
                zeroPad: 1
            })
        })

        this.anims.create({
            key: 'bomb',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNames('bomb', {
                prefix: 'bomb',
                suffix: '.png',
                start: 2,
                end: 5,
                zeroPad: 1
            })
        })
        this.anims.create({
            key: 'idle2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 13,
                end: 16,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'idle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 11,
                end: 14,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'up2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 10,
                end: 12,
                zeroPad: 2
            })
        })

        this.anims.create({
            key: 'left2',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 4,
                end: 6,
                zeroPad: 1
            })
        })
        this.anims.create({
            key: 'right2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 7,
                end: 9,
                zeroPad: 1
            })
        })
        this.anims.create({
            key: 'down2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 22,
                end: 24,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'expand',
            frameRate: 4,
            frames: this.anims.generateFrameNames('expand', {
                prefix: 'bommber_01_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'expand_right',
            frameRate: 4,
            frames: this.anims.generateFrameNames('expand', {
                prefix: 'bommber_01_',
                suffix: '.png',
                start: 8,
                end: 14,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'expand_far_right',
            frameRate: 4,
            frames: this.anims.generateFrameNames('expand', {
                prefix: 'bommber_01_',
                suffix: '.png',
                start: 15,
                end: 21,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'expand',
            frameRate: 4,
            frames: this.anims.generateFrameNames('expand', {
                prefix: 'bommber_01_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'death',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'bomb',
                suffix: '.png',
                start: 2,
                end: 5,
                zeroPad: 1
            })
        })

        let map = this.add.tilemap('map2')
        let tilemap = map.addTilesetImage("tilesheet_cave", 'level_1')
        map.createStaticLayer('Ground', tilemap, 0, 0).setDepth(-1)

        this.rocks = map.createStaticLayer('Top', tilemap, 0, 0).setDepth(2)
        this.rocks.immovable = true;
        this.rocks.setCollision([56])

        this.socket.on('powerupTaken', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.powerup.visible = false
                    self.powerup.active = false
                    self.time.delayedCall(6000, () => {

                        self.powerup.active = true
                        self.powerup.visible = true
                        self.powerup.x = 400
                        self.powerup.y = 400
                        self.powerup.setVelocityX(0)
                        self.powerup.setVelocityY(0)
                        self.powerup.immovable = true

                    })

                }
            })
        })
        this.physics.world.setBounds(-1, -1, 740, 730, true, true, true, true)
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                    if (self.otherPlayer.active === true) {
                        let cursors = self.input.keyboard.createCursorKeys();
                        let spaceBar = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

                        // if (self.otherPlayer) {
                        //     if (cursors.left.isDown) {

                        //         self.otherPlayer.anims.play('left2', true);
                        //     } else if (cursors.right.isDown) {


                        //         self.otherPlayer.anims.play('right2', true);
                        //     } else if (cursors.up.isDown) {


                        //         self.otherPlayer.anims.play('up2', true);
                        //     } else if (cursors.down.isDown) {

                        //         self.otherPlayer.anims.play('down2')
                        //     } else {

                        //         self.otherPlayer.anims.play('idle2')
                        //     }

                        // }
                    }

                }
            });
        });

        this.socket.on('playerLeft', function (playerInfo) {

            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.otherPlayer.play('left2', true)
                }
            })
        })
        this.socket.on('playerRight', function (playerInfo) {

            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.otherPlayer.play('right2', true)
                }
            })
        })
        this.socket.on('playerUp', function (playerInfo) {

            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.otherPlayer.play('up2', true)
                }
            })
        })
        this.socket.on('playerDown', function (playerInfo) {

            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.otherPlayer.play('down2', true)
                }
            })
        })
        this.socket.on('Bomb', function (playerInfo) {

            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    console.log(self.bomb)
                    let bomb = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'bomb', 'bomb2.png')
                    bomb.anims.play('bomb')
                    bomb.immovable = true
                    bomb.setSize(32, 32, true)
                    self.physics.add.collider(self.player, bomb)
                    self.physics.add.collider(self.otherPlayer, bomb)
                    self.sound.add("explode", {
                        volume: 0.2
                    })
                    let timedEvent = self.time.delayedCall(1200, function onEvent() {
                        bomb.destroy()
                        let expand = self.physics.add.sprite(bomb.x, bomb.y, 'expand', 'bommber_01_14.png')
                        let expandRight = self.physics.add.sprite(bomb.x + 40, bomb.y, 'expand')
                        let expandFarRight = self.physics.add.sprite(bomb.x + 120, bomb.y, 'expand')
                        let expandMidRight = self.physics.add.sprite(bomb.x + 80, bomb.y, 'expand')
                        let expandLeft = self.physics.add.sprite(bomb.x - 40, bomb.y, 'expand').setScale(-1)
                        let expandMidLeft = self.physics.add.sprite(bomb.x - 80, bomb.y, 'expand').setScale(-1)
                        let expandFarLeft = self.physics.add.sprite(bomb.x - 120, bomb.y, 'expand').setScale(-1)
                        let expandTop = self.physics.add.sprite(bomb.x, bomb.y - 40, 'expand')
                        let expandTopMid = self.physics.add.sprite(bomb.x, bomb.y - 80, 'expand')
                        let expandTopFar = self.physics.add.sprite(bomb.x, bomb.y - 120, 'expand')
                        let expandBottom = self.physics.add.sprite(bomb.x, bomb.y + 40, 'expand')
                        let expandMidBottom = self.physics.add.sprite(bomb.x, bomb.y + 80, 'expand')
                        let expandBottomFar = self.physics.add.sprite(bomb.x, bomb.y + 120, 'expand')
                        expandTop.angle = 90
                        expandTopMid.angle = 90
                        expandTopFar.angle = -90
                        expandBottom.angle = -90
                        expandMidBottom.angle = -90
                        expandBottomFar.angle = 90
                        expand.setOrigin(0.5, 0.5)
                        expand.play('expand')
                        expandLeft.play('expand_right')
                        expandMidLeft.play('expand_right')
                        expandFarLeft.play('expand_far_right')
                        expandRight.play('expand_right')
                        expandTop.play('expand_right')
                        expandTopMid.play('expand_right')
                        expandTopFar.play('expand_far_right')
                        expandBottom.play('expand_right')
                        expandMidBottom.play('expand_right')
                        expandBottomFar.play('expand_far_right')
                        // this.expandTop.play('expand_right')
                        expandMidRight.play('expand_right')
                        expandFarRight.play('expand_far_right')
                        self.physics.add.collider(self.otherPlayer, expand, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)

                        })
                        self.physics.add.collider(self.otherPlayer, expandRight, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandMidRight, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandLeft, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandMidLeft, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandFarLeft, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })

                        self.physics.add.collider(self.otherPlayer, expandTopMid, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandTop, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandTopFar, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandBottom, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandMidBottom, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })
                        self.physics.add.collider(self.otherPlayer, expandBottomFar, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)
                        })

                        self.physics.add.collider(self.otherPlayer, expandFarRight, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.otherPlayer.destroy()
                            addOtherPlayers(self, playerInfo)

                        })

                        self.physics.add.collider(self.player, expand, () => {
                            let music = self.sound.play("defeat", {
                                volume: 0.7
                            })
                            self.deathCount++
                            self.player.destroy()
                        })
                        self.physics.add.collider(self.player, expandFarRight, () => {
                            self.player.destroy()
                        })
                        self.physics.add.collider(self.player, expandMidRight, () => {
                            self.player.destroy()
                        })

                        self.physics.add.collider(self.player, expandMidLeft, () => {
                            self.player.destroy()
                        })
                        self.physics.add.collider(self.player, expandLeft, () => {
                            self.player.destroy()
                        })

                        self.physics.add.collider(self.player, expandFarLeft, () => {
                            self.player.destroy()
                        })
                        let newTimeEvent = self.time.delayedCall(800, () => {
                            expand.destroy()
                            expandRight.destroy()
                            expandMidRight.destroy()
                            expandFarRight.destroy()
                            expandLeft.destroy()
                            expandMidLeft.destroy()
                            expandFarLeft.destroy()
                            expandTop.destroy()
                            expandTopMid.destroy()
                            expandTopFar.destroy()
                            expandBottom.destroy()
                            expandMidBottom.destroy()
                            expandBottomFar.destroy()

                        })

                        // explosion = self.add.sprite(bomb.x, bomb.y, 'explosion',)
                    }, [], this)
                    //   bomb.setPosition(playerInfo.x, playerInfo.y);
                }
            });

        });


    }
    update() {
        function addPlayer(self, playerInfo) {

            // self.physics.add.collide(player, rocks)

            self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0)
            self.player.setCollideWorldBounds(true);
            self.player.onWorldBounds = true;
            self.physics.add.collider(self.player, self.rocks)

            // self.physics.add.collider(self.player, otherPlayer)
        }

        if (this.player.active === true) {

            var x = this.player.x;
            var y = this.player.y;

            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
                this.socket.emit('playerMovement', {
                    x: this.player.x,
                    y: this.player.y
                });
            }
            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y,
            };
            let cursors = this.input.keyboard.createCursorKeys();
            let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            let space = Phaser.Input.Keyboard.JustDown(spaceBar)




            if (space) {
                this.socket.emit('Bombset', {
                    x: this.player.x,
                    y: this.player.y
                })

                let bomb = this.add.sprite(this.player.x, this.player.y, 'bomb', 'bomb2.png')
                bomb.anims.play('bomb')
                bomb.setSize(32, 32, true)
                bomb.setOrigin(0)
                // bomb.on('animationcomplete', animComplete, this)
                this.time.delayedCall(1200, () => {
                    this.sound.add("explode", {
                        volume: 0.6
                    })
                    this.expand = this.physics.add.sprite(bomb.x, bomb.y, 'expand', 'bommber_01_14.png')
                    this.expandRight = this.physics.add.sprite(bomb.x + 40, bomb.y, 'expand')
                    this.expandFarRight = this.physics.add.sprite(bomb.x + 120, bomb.y, 'expand')
                    this.expandMidRight = this.physics.add.sprite(bomb.x + 80, bomb.y, 'expand')
                    this.expandLeft = this.physics.add.sprite(bomb.x - 40, bomb.y, 'expand')
                    this.expandMidLeft = this.physics.add.sprite(bomb.x - 80, bomb.y, 'expand')
                    this.expandFarLeft = this.physics.add.sprite(bomb.x - 120, bomb.y, 'expand')
                    this.expandTop = this.physics.add.sprite(bomb.x, bomb.y - 40, 'expand')
                    this.expandTopMid = this.physics.add.sprite(bomb.x, bomb.y - 80, 'expand')
                    this.expandTopFar = this.physics.add.sprite(bomb.x, bomb.y - 120, 'expand')
                    this.expandBottom = this.physics.add.sprite(bomb.x, bomb.y + 40, 'expand')
                    this.expandMidBottom = this.physics.add.sprite(bomb.x, bomb.y + 80, 'expand')
                    this.expandBottomFar = this.physics.add.sprite(bomb.x, bomb.y + 120, 'expand')
                    this.expandFarLeft.angle = 180
                    this.expand.setOrigin(0.5, 0.5)
                    this.expandTop.angle = 90
                    this.expandTopMid.angle = 90
                    this.expandTopFar.angle = -90
                    this.expandBottom.angle = -90
                    this.expandMidBottom.angle = -90
                    this.expandBottomFar.angle = 90
                    this.expand.immovable = true
                    this.expandLeft.immovable = true
                    this.expandFarLeft.immovable = true
                    this.expandMidLeft.immovable = true
                    this.expandRight.immovable = true
                    this.expandMidRight.immovable = true
                    this.expandFarRight.immovable = true
                    this.expandTop.immovable = true
                    this.expandTopMid.immovable = true
                    this.expandTopFar.immovable = true
                    this.expandBottom.immovable = true
                    this.expandMidBottom.immovable = true
                    this.expandBottomFar.immovable = true
                    this.expandBottom.play('expand_right')
                    this.expandMidBottom.play('expand_right')
                    this.expandBottomFar.play('expand_far_right')
                    this.expandTop.play('expand_right')
                    this.expandTopMid.play('expand_right')
                    this.expandTopFar.play('expand_far_right')
                    this.expand.play('expand')
                    this.expandLeft.play('expand_right')
                    this.expandMidLeft.play('expand_right')
                    this.expandFarLeft.play('expand_far_right')
                    this.expandRight.play('expand_right')
                    // this.expandTop.play('expand_right')
                    this.expandMidRight.play('expand_right')
                    this.expandFarRight.play('expand_far_right')
                    this.physics.add.collider(this.rocks, this.expandRight, () => {
                        this.expandRight.destroy()
                        this.expandMidRight.destroy()
                        this.expandFarRight.destroy()
                        console.log('hit')
                    })

                    this.physics.add.collider(this.otherPlayer, this.expand, () => {

                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandRight, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandMidRight, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandLeft, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandMidLeft, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandFarLeft, () => {
                        this.otherPlayer.destroy()
                    })

                    this.physics.add.collider(this.otherPlayer, this.expandFarRight, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandBottom, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandMidBottom, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandBottomFar, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandTop, () => {
                        this.otherPlayer.destroy()
                    })
                    this.physics.add.collider(this.otherPlayer, this.expandTopMid, () => {
                        this.otherPlayer.destroy()
                    })

                    this.physics.add.collider(this.otherPlayer, this.expandTopFar, () => {
                        this.otherPlayer.destroy()
                    })

                    this.physics.add.collider(this.player, this.expand, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandFarRight, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {

                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandMidRight, () => {
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })

                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandMidLeft, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandLeft, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })

                    this.physics.add.collider(this.player, this.expandFarLeft, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandTop, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })

                    this.physics.add.collider(this.player, this.expandTopMid, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandTopFar, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })

                    this.physics.add.collider(this.player, this.expandBottom, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    this.physics.add.collider(this.player, this.expandMidBottom, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })

                    this.physics.add.collider(this.player, this.expandBottomFar, () => {
                        let music = this.sound.play("defeat", {
                            volume: 0.7
                        })
                        this.deathCount++
                        this.deathCounter.destroy()
                        this.deathCounter = this.add.text(400, 20, "Time Died:" + this.deathCount, {
                            fontFamily: "Roboto Condensed",
                            color: "#ffffff",
                            fontSize: '30px'
                        })
                        this.player.destroy()
                        this.time.delayedCall(3000, () => {
                            this.player = this.physics.add.sprite(500, 400, 'player')
                            this.physics.add.collider(this.player, this.rocks)
                            this.player.setCollideWorldBounds(true)
                            this.physics.add.collider(this.powerup, this.player, () => {
                                this.powerUpActive = true
                                this.powerup.visible = false
                                this.powerup.active = false
                                this.socket.emit(
                                    'powerup', {
                                        x: this.player.x,
                                        y: this.player.y
                                    }
                                )
                                this.time.delayedCall(6000, () => {
                                    this.powerUpActive = false
                                    this.powerup.active = true
                                    this.powerup.visible = true
                                    this.powerup.x = 400
                                    this.powerup.y = 400
                                    this.powerup.setVelocityX(0)
                                    this.powerup.setVelocityY(0)
                                    this.powerup.immovable = true

                                })
                            })
                        })
                    })
                    bomb.destroy()
                    this.time.delayedCall(1000, () => {
                        this.expand.destroy()
                        this.expandRight.destroy()
                        this.expandMidRight.destroy()
                        this.expandFarRight.destroy()
                        this.expandLeft.destroy()
                        this.expandMidLeft.destroy()
                        this.expandFarLeft.destroy()
                        this.expandTop.destroy()
                        this.expandTopMid.destroy()
                        this.expandTopFar.destroy()
                        this.expandBottom.destroy()
                        this.expandMidBottom.destroy()
                        this.expandBottomFar.destroy()

                    }, [], this)
                
                })
            }

            function animComplete(animation, frame) {
                //  Animation is over, let's fade the sprite out
                this.tweens.add({
                    targets: this.bomb,
                    duration: 1000,
                    anims: null
                });
            }

            if (cursors.left.isDown) {
                this.socket.emit('Left', {
                    x: this.player.x,
                    y: this.player.y
                })

                this.player.anims.play('left', true);
                if (this.powerUpActive === true) {
                    this.player.setVelocityX(-300)
                } else {
                    this.player.setVelocityX(-170)
                }
            } else if (cursors.right.isDown) {
                this.socket.emit('Right', {
                    x: this.player.x,
                    y: this.player.y
                })

                this.player.play('right', true);
                if (this.powerUpActive === true) {
                    this.player.setVelocityX(300)
                } else {
                    this.player.setVelocityX(170)
                }


            } else if (cursors.up.isDown) {
                this.socket.emit('Up', {
                    x: this.player.x,
                    y: this.player.y
                })

                this.player.play('up', true);
                if (this.powerUpActive === true) {
                    this.player.setVelocityY(-300)
                } else {
                    this.player.setVelocityY(-170)
                }

            } else if (cursors.down.isDown) {
                this.socket.emit('Down', {
                    x: this.player.x,
                    y: this.player.y
                })

                this.player.play('down', true)
                if (this.powerUpActive === true) {
                    this.player.setVelocityY(300)
                } else {
                    this.player.setVelocityY(170)
                }

            }
            if (cursors.down.isUp && cursors.up.isUp) {

                this.player.setVelocityY(0)

            }
            if (cursors.left.isUp && cursors.right.isUp) {
                this.player.setVelocityX(0)


            }
            if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp) {
                this.player.play('idle', true)
            }
        }

    }
}