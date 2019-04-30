class bootGame extends Phaser.Scene {
    constructor() {
        super({ key: "bootGame" })
    }

    preload() {
        this.load.image('titlescreen', './assets/bg.png')

        this.load.audio('music', './assets/bomberman_music.mp3')
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xfffff
            }
        })
        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        })
        this.load.on('complete', function () {
            console.log("done")
        })
    }
    init(data) {

    }

    create() {
        //  this.createButton(game,"Play", 400, 300 + 32, 300, 100,
        //  function() {
        //      this.state.start('Example1')
        //  })

        // this.createButton(game,"About", 400, 300 + 192, 300, 100, function()  {
        //      console.log('About')



        this.scene.start("Menu")
    }

    update() {

    }

    // createButton(game, string, x, y, w, h, callback) {
    //     var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0)

    //     button1.anchor.setTo(0.5, 0.5)
    //     button1.width = w
    //     button1.height = h

    //     var txt = game.add.text(button1.x, button1.y, string, {
    //         font: "15px Arial",
    //         fill: "#fff",
    //         align: center
    //     })
    //     txt.anchor.setTo(0.5, 0.5)
    // }
}
