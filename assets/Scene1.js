class Scene1 extends Phaser.Scene {

    constructor() {
        super({
            key: "Scene1"
        })
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
    }

    create() {
        
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


        function addPlayer(self, playerInfo) {

            // self.physics.add.collide(player, rocks)

            self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0)
            self.player.setCollideWorldBounds(true);
            self.player.onWorldBounds = true;
            self.physics.add.collider(self.player, self.rocks)

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
            frameRate: 4,
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

        let map = this.add.tilemap('map2')
        let tilemap = map.addTilesetImage("tilesheet_cave", 'level_1')
        map.createStaticLayer('Ground', tilemap, 0, 0).setDepth(-1)

        this.rocks = map.createStaticLayer('Top', tilemap, 0, 0)
        this.rocks.immovable = true;
        this.rocks.setCollision([48, 56])


        this.physics.world.setBounds(-1, -1, 740, 730, true, true, true, true)
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                    if (this.otherPlayer.active === true) {
                        let cursors = this.input.keyboard.createCursorKeys();
                        let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            
                        if (cursors.left.isDown) {
            
            
                            this.otherPlayer.anims.play('left2', true);
                        } else if (cursors.right.isDown) {
            
            
                            this.otherPlayer.anims.play('right2', true);
                        } else if (cursors.up.isDown) {
            
            
                            this.otherPlayer.anims.play('up2', true);
                        } else if (cursors.down.isDown) {
            
                            this.otherPlayer.anims.play('down2')
                        } else {
            
                            this.otherPlayer.anims.play('idle')
                        }
            
                    }
                }
            });
        });

        this.socket.on('Bomb', function (playerInfo) {
            console.log('Bomb', playerInfo)
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    console.log(self.bomb)
                    let bomb = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'bomb', 'bomb2.png')
                    bomb.anims.play('bomb')
                    bomb.immovable = true
                    bomb.setSize(32, 32, true)
                    self.physics.add.collider(self.player, bomb)
                    self.physics.add.collider(self.otherPlayer, bomb)

                    let timedEvent = self.time.delayedCall(900, function onEvent() {
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
                        // this.expandTop.play('expand_right')
                        expandMidRight.play('expand_right')
                        expandFarRight.play('expand_far_right')
                        self.physics.add.collider(self.otherPlayer, expand, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.otherPlayer, expandRight, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.otherPlayer, expandMidRight, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.otherPlayer, expandLeft, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.otherPlayer, expandMidLeft, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.otherPlayer, expandFarLeft, () => {
                            self.otherPlayer.destroy()
                        })

                        self.physics.add.collider(self.otherPlayer, expandFarRight, () => {
                            self.otherPlayer.destroy()
                        })
                        self.physics.add.collider(self.player, expand, () => {
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

                        })

                        // explosion = self.add.sprite(bomb.x, bomb.y, 'explosion',)
                    }, [], this)
                    //   bomb.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

    }
    update() {
        
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

                let bomb = this.add.sprite(this.player.x, this.player.y, 'bomb', 'bomb2.png')
                bomb.anims.play('bomb')
                bomb.setSize(32, 32, true)
                bomb.setOrigin(0)
                // bomb.on('animationcomplete', animComplete, this)
                this.time.delayedCall(1200, () => {
                    this.expand = this.physics.add.sprite(bomb.x, bomb.y, 'expand', 'bommber_01_14.png')
                    this.expandRight = this.physics.add.sprite(bomb.x + 40, bomb.y, 'expand')
                    this.expandFarRight = this.physics.add.sprite(bomb.x + 120, bomb.y, 'expand')
                    this.expandMidRight = this.physics.add.sprite(bomb.x + 80, bomb.y, 'expand')
                    this.expandLeft = this.physics.add.sprite(bomb.x - 40, bomb.y, 'expand').setScale(-1)
                    this.expandMidLeft = this.physics.add.sprite(bomb.x - 80, bomb.y, 'expand').setScale(-1)
                    this.expandFarLeft = this.physics.add.sprite(bomb.x - 120, bomb.y, 'expand').setScale(-1)
                    this.expandTop = this.physics.add.sprite(bomb.x, bomb.y - 40, 'expand')
                    this.expandTopMid = this.physics.add.sprite(bomb.x, bomb.y - 80, 'expand')
                    this.expandTopFar = this.physics.add.sprite(bomb.x, bomb.y - 120, 'expand')
                    this.expandBottom = this.physics.add.sprite(bomb.x, bomb.y + 40, 'expand')
                    this.expandMidBottom = this.physics.add.sprite(bomb.x, bomb.y + 80, 'expand')
                    this.expandBottomFar = this.physics.add.sprite(bomb.x, bomb.y + 120, 'expand')
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
                    this.physics.add.collider(this.player, this.expand, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandFarRight, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandMidRight, () => {
                        this.player.destroy()
                    })

                    this.physics.add.collider(this.player, this.expandMidLeft, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandLeft, () => {
                        this.player.destroy()
                    })

                    this.physics.add.collider(this.player, this.expandFarLeft, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandTop, () => {
                        this.player.destroy()
                    })

                    this.physics.add.collider(this.player, this.expandTopMid, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandTopFar, () => {
                        this.player.destroy()
                    })

                    this.physics.add.collider(this.player, this.expandBottom, () => {
                        this.player.destroy()
                    })
                    this.physics.add.collider(this.player, this.expandMidBottom, () => {
                        this.player.destroy()
                    })

                    this.physics.add.collider(this.player, this.expandBottomFar, () => {
                        this.player.destroy()
                    })
                  
                
                    this.physics.add.collider(this.bomb, this.player, () => {
                        console.log('collide')
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

            if (cursors.left.isDown === true) {
                
                this.player.anims.play('left');
                this.player.setVelocityX(-170)

            }
            if (cursors.right.isDown) {
                this.player.setVelocityX(170)

                this.player.play('right', true);
            }
            if (cursors.up.isDown) {
                this.player.setVelocityY(-170)

                this.player.play('up', true);
            }
            if (cursors.down.isDown) {
                this.player.setVelocityY(170)

                this.player.play('down')
            }
            if (cursors.down.isUp && cursors.up.isUp) {

                this.player.setVelocityY(0)
                this.player.play('idle')
            }
            if (cursors.left.isUp && cursors.right.isUp) {
                this.player.setVelocityX(0)

                this.player.anims.play('idle')
            }
        }

    }
}