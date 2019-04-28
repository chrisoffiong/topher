var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
var map
var space
var self
var player
var otherPlayers
var otherPlayer
var cursors
var bomb
var spaceBar
var tween
var text
var rocks
var isSpacePressed = false
var timedEvent
var newPhysics

function preload() {
    this.load.atlas('player', './assets/sprites.png', './assets/sprites.json')
    this.load.image('level_1', './assets/maps/tilesheet_cave.png')
    this.load.tilemapTiledJSON('map2','/assets/maps/real.json')
    this.load.tilemapTiledJSON('map', './assets/maps/level_1.json')
    this.load.atlas('bomb', './assets/bomb.png', './assets/bomb.json')
    this.load.atlas('player2', './assets/player2.png', './assets/player2.json')
    this.load.json('levels', './assets/levels.json')
    this.load.image('bg', './assets/bg.png')

}

function create() {
   window.player = this.player
    this.cameras.main.centerOn(400, 300)
    this.player = this.physics.add.sprite(400,600,  'player')
    this.player.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;
    var self = this;
    this.socket = io();
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            }
        });
    });
    console.log(self)
     
    cursors = this.input.keyboard.createCursorKeys();
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    
    // rocks.collideWorldBounds = true
    console.log(rocks)
    function addPlayer(self, playerInfo) {
      
     
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
        otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'player2')
        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
        
        
    }
    // this.player = this.physics.add.sprite(240, 180, 'player', 'bomb11.png').setOrigin(0, 0.5)
    // this.player.colliderWorldBounds = true

    // this.player2 = this.physics.add.sprite(350, 450, 'player2', 'bombs5.png').setOrigin(0, 0.5)
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
    this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S
    })
   
    
    map = this.add.tilemap('map2')
    let tilemap = map.addTilesetImage("tilesheet_cave", 'level_1')

    this.ground = map.createStaticLayer('Ground', [tilemap],0,0).setDepth(-1)
    rocks = map.createStaticLayer('Top' , [tilemap], 0, 0)
    
    rocks.immovable = true;
    this.physics.add.collider(this.player, map.getLayer('Top'), function() {
        console.log('hit')
    })
    rocks.setCollision([48, 56])
    
    
  
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
        bomb = self.add.sprite(playerInfo.x, playerInfo.y, 'bomb', 'bomb2.png')
        bomb.anims.play('bomb')
        bomb.setSize(32, 32, true)
        timedEvent = self.time.delayedCall(500, function onEvent() {
            bomb.destroy()
            // explosion = self.add.sprite(bomb.x, bomb.y, 'explosion',)
        }, [], this)
    //   bomb.setPosition(playerInfo.x, playerInfo.y);
    }
  });
  
});

}
 document.addEventListener("keydown", space);
function space(event) {
    if( event.keyCode === 32) {
        isSpacePressed = true
        ableToPressSpace = true
        setTimeout (function() {
            ableToPressSpace = false
        }, 300)
        if (isSpacePressed && ableToPressSpace) {
          
        }
        // setTimeout(function() {
        //     isSpacePressed = false
        // }, 500)
    
    }
}


function update() {
  
    //     'Value: ' + tween.getValue(),
    //     'Progress: ' + tween.totalProgress,
    //     'Elapsed: ' + tween.totalElapsed,
    //     'Duration: ' + tween.totalDuration
    // ]);
    if (this.player) {
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
        if (space) {
            isSpacePressed = true
            setTimeout(function() {
                
                    isSpacePressed = false 
            }, 500)

        }
      
        space = Phaser.Input.Keyboard.JustDown(spaceBar)
      
        if (space) {
            
            bomb = this.add.sprite(player.x, player.y, 'bomb', 'bomb2.png')
            bomb.anims.play('bomb')
            bomb.setSize(32, 32, true)
            // bomb.on('animationcomplete', animComplete, this)
            timedEvent = this.time.delayedCall(500, onEvent, [], this)
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
            this.player.x--;

            this.player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.player.x++;

            this.player.anims.play('right', true);
        } else if (cursors.up.isDown) {
            this.player.y--

            this.player.anims.play('up', true);
        } else if (cursors.down.isDown) {
            this.player.y++

            this.player.anims.play('down')
        } else if (cursors.down.isUp) {

            this.player.anims.play('idle')
        }
        else if (self.otherPlayer) {
            if (cursors.left.isDown) {


                otherPlayer.anims.play('left2', true);
            } else if (cursors.right.isDown) {


                otherPlayer.anims.play('right2', true);
            } else if (cursors.up.isDown) {


                otherPlayer.anims.play('up2', true);
            } else if (cursors.down.isDown) {

                otherPlayer.anims.play('down2')
            } else {

                otherPlayer.anims.play('idle')
            }

        }
    }
    function onEvent() {
        self.bomb.destroy()
    }
 
}