var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene:  [ bootGame, Menu, Scene1],
    render: {
        pixelArt: true
    }
    
}

var game = new Phaser.Game(config);
