class Scene1 extends Phaser.Scene {

    constructor() {
        super({ key: "Scene1" })
    }

    preload() {
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
    }

    create() {

        this.cameras.main.centerOn(400, 300)
        window.otherPlayer = this.otherPlayer
        window.player = this.player
        var self = this;
        this.otherPlayer = this.physics.add.sprite(300, 400, 'player2')
        this.player = this.physics.add.sprite(300,400, 'player')
        this.socket = io();
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    addPlayer(self, players[id]);
                }
            });
        });
        console.log(self)

        function addPlayer(self, playerInfo) {

            // self.physics.add.collide(player, rocks)
            console.log(self)
            self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0)
            self.player.setCollideWorldBounds(true);
            self.player.onWorldBounds = true;
            self.physics.add.collider(self.player, rocks)

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
            let otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player2')
            otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(otherPlayer);


        }

        this.anims.create({
            key: 'idle',
            frameRate: 8,
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
            key: 'up',
            frameRate: 8,
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
            frameRate: 8,
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
            frameRate: 8,
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
                start: 9,
                end: 10,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'idle',
            frameRate: 8,
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
            frameRate: 8,
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
                start: 21,
                end: 23,
                zeroPad: 2
            })
        })

        this.anims.create({
            key: 'left2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 15,
                end: 17,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'right2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 18,
                end: 20,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'down2',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('player2', {
                prefix: 'bombs',
                suffix: '.png',
                start: 9,
                end: 10,
                zeroPad: 2
            })
        })
        this.anims.create({
            key: 'expand',
            frameRate: 8,
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
            frameRate: 8,
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
            frameRate: 8,
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
            frameRate: 8,
            frames: this.anims.generateFrameNames('expand', {
                prefix: 'bommber_01_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            })
        })

        let map = this.add.tilemap('map2')
        let tilemap = map.addTilesetImage("tilesheet_cave", 'level_1')
        map.createStaticLayer('Ground', tilemap, 0, 0).setDepth(-1)

        let rocks = map.createStaticLayer('Top', tilemap, 0, 0)
        rocks.immovable = true;
        rocks.setCollision([48, 56])
        console.log(this)

        this.physics.world.setBounds(-1, -1, 740, 730, true, true, true, true)
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        this.socket.on('Bomb', function (playerInfo) {
            console.log(bomb)
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    self.bomb = self.add.sprite(playerInfo.x, playerInfo.y, 'bomb', 'bomb2.png')
                    self.bomb.anims.play('bomb')
                    self.bomb.setSize(32, 32, true)
                    timedEvent = self.time.delayedCall(500, function onEvent() {
                        self.bomb.destroy()

                        // explosion = self.add.sprite(bomb.x, bomb.y, 'explosion',)
                    }, [], this)
                    //   bomb.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

    }
    update() {
        
        if (this.player.active === true ) {

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

                let bomb = this.add.sprite(this.player.x, this.player.y, 'bomb', 'bomb2.png')
                bomb.anims.play('bomb')
                bomb.setSize(32, 32, true)
                bomb.setOrigin(0)
                // bomb.on('animationcomplete', animComplete, this)
                this.time.delayedCall(500, () => {
                    this.expand = this.physics.add.sprite(bomb.x, bomb.y, 'expand', 'bommber_01_14.png')
                    this.expandRight = this.physics.add.sprite(bomb.x + 40, bomb.y, 'expand')
                    this.expandFarRight = this.physics.add.sprite(bomb.x + 120, bomb.y, 'expand')
                    this.expandMidRight = this.physics.add.sprite(bomb.x + 80, bomb.y, 'expand')
                    this.expandLeft = this.physics.add.sprite(bomb.x - 40, bomb.y, 'expand').setScale(-1)
                    this.expandMidLeft = this.physics.add.sprite(bomb.x - 80, bomb.y, 'expand').setScale(-1)
                    this.expandFarLeft = this.physics.add.sprite(bomb.x - 120, bomb.y, 'expand').setScale(-1)
                    this.expandTop = this.physics.add.sprite(bomb.x, bomb.y + 40, 'expand').setScale(.5)
                    this.expand.setOrigin(0.5, 0.5)
                    this.expand.play('expand')
                    this.expandLeft.play('expand_right')
                    this.expandMidLeft.play('expand_right')
                    this.expandFarLeft.play('expand_far_right')
                    this.expandRight.play('expand_right')
                    // this.expandTop.play('expand_right')
                    this.expandMidRight.play('expand_right')
                    this.expandFarRight.play('expand_far_right')
                    this.physics.add.collider(this.player, this.expand, () => {
                        this.sound.play("defeat", {volume: 0.7})
                        this.player.destroy()
                    })
                    // this.physics.add.collider(this.otherPlayer, this.expand, () => {
                    //     this.otherPlayer.destroy()
                    // })
                    // this.physics.add.collider(this.otherPlayer, this.expandRight, () => {
                    //     this.otherPlayer.destroy()
                    // })
                    // this.physics.add.collider(this.otherOlayer, this.expandMidRight, () => {
                    //     this.otherPlayer.destroy()
                    // })
                    // this.physics.add.collider(this.player, this.expandFarRight, () => {
                    //     this.otherPlayer.destroy()
                    // })
                    this.physics.add.collider(this.player, this.expandFarRight, () => {
                        this.sound.play("defeat", {volume: 0.7})
                        this.player.destroy()
                       
                    })
                    this.physics.add.collider(this.player, this.expandMidRight, () =>{
                        this.sound.play("defeat", {volume: 0.7})
                        this.player.destroy()
                     
                    })
                    this.physics.world.collide(this.expandLeft, this.onworldBounds,() =>{
                        this.sound.play("defeat", {volume: 0.7})
                        this.expandRight.destroy()
                       
                    })
                    this.physics.add.collider(this.player, this.expandFarLeft, () => {
                        this.sound.play("defeat", {volume: 0.7})
                        this.player.destroy()
                       
                    })
                    this.physics.add.collider(this.player, this.expandMidLeft, () =>{
                        this.sound.play("defeat", {volume: 0.7})
                        this.player.destroy()
                     
                    })
                    this.physics.world.collide(this.expandRight, this.onworldBounds,() =>{
                        this.sound.play("defeat", {volume: 0.7})
                        this.expandRight.destroy()
                       
                    })
                    bomb.destroy()
                    this.time.delayedCall(400, () => {
                        this.expand.destroy()
                        this.expandRight.destroy()
                        this.expandMidRight.destroy()
                        this.expandFarRight.destroy()
                        this.expandLeft.destroy()
                        this.expandMidLeft.destroy()
                        this.expandFarLeft.destroy()
                        
                    })
                }, [], this)
                this.socket.emit('Bombset', {
                    x: this.player.x,
                    y: this.player.y
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
            if (this.bomb > 1) {

            }
            
                if (cursors.left.isDown) {
                    this.player.setVelocityX(-130)

                    this.player.anims.play('left', true);
                } if (cursors.right.isDown) {
                    this.player.setVelocityX(130)
                    
                    this.player.anims.play('right', true);
                } if (cursors.up.isDown) {
                    this.player.setVelocityY(-130)

                    this.player.anims.play('up', true);
                } if (cursors.down.isDown) {
                    this.player.setVelocityY(130)

                    this.player.anims.play('down')
                } if (cursors.down.isUp && cursors.up.isUp) {

                    this.player.setVelocityY(0)
                    this.player.anims.play('idle')
                } if (cursors.left.isUp && cursors.right.isUp) {
                    this.player.setVelocityX(0)

                    this.player.anims.play('idle')
                }
            }
            // if (this.otherPlayers) {
            //     let cursors = this.input.keyboard.createCursorKeys();
            // let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
           
            //     if (cursors.left.isDown) {


            //         this.otherPlayer.anims.play('left2', true);
            //     } else if (cursors.right.isDown) {


            //         this.otherPlayer.anims.play('right2', true);
            //     } else if (cursors.up.isDown) {


            //         this.otherPlayer.anims.play('up2', true);
            //     } else if (cursors.down.isDown) {

            //         this.otherPlayer.anims.play('down2')
            //     } else {

            //         this.otherPlayer.anims.play('idle')
            //     }

            // }
        }
    }
