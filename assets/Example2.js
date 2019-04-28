class Example2 extends Phaser.Scene {
    constructor() {
        super({key: "Example2"})
    }
    
    preload() {
        this.load.image('titlescreen', './assets/bg.png')
        this.load.spritesheet('bomb', './assets/dude.png', 20 , 30)
    }

    create()  {
        //  this.createButton(game,"Play", 400, 300 + 32, 300, 100,
        //  function() {
        //      this.state.start('Example1')
        //  })

        // this.createButton(game,"About", 400, 300 + 192, 300, 100, function()  {
        //      console.log('About')
        //  })
         let bomb
        let titlescreen
        bomb = this.add.image(400, 300, 'bomb', this, 1, 0, 2)
        titlescreen = this.add.image(400, 300, 'titlescreen')
        
    }

    update (game) {

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
