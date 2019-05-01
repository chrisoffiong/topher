class Menu extends Phaser.Scene {
    constructor() {
        super({key: "Menu"})
    }
    
    preload() {
        this.load.image('titlescreen', './assets/bg.png')
        this.load.atlas('bomb', './assets/bomb.png', './assets/bomb.json')
        this.load.audio('music', './assets/bomberman_music.mp3')
        this.load.image('enter', './assets/enter.png')
        this.load.atlas('explosion', './assets/explosionn.png', './assets/explosion.json')
    }
    init(data) {

    }

    create()  {
        let music = this.sound.add("music", {volume: 0.2})
        music.play()
       let playButton = this.add.image(600, 700, "enter").setDepth(2)
       let hoverSprite= this.add.sprite(100, 100, 'bomb', 'bomb2.png').setDepth(2)
       let bombSprite = this.add.sprite(100, 100, 'explosion', 'explosion_09.png').setDepth(2)
       bombSprite.setScale(2)
       bombSprite.setVisible(false)
       hoverSprite.setScale(2)
       hoverSprite.setVisible(false)
        this.anims.create({
            key: 'walk',
            frameRate: 4,
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
            key: 'explode',
            frameRate: 4,
            frames: this.anims.generateFrameNames('explosion', {
                             prefix: 'explosion_',
                             suffix: '.png',
                             start: 10,
                             end: 14,
                             zeroPad: 1
                       })
        })

        this.add.image(600, 600,'titlescreen')
        // this.add.text(150,400, "Loading game...", {
        //     fontSize: 64,
        //     color: '#000000'
        // })
        playButton.setInteractive()

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true)
            hoverSprite.play("walk")
            hoverSprite.x = playButton.x - 150
            hoverSprite.y = playButton.y
        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false)
        })

        playButton.on("pointerup", () => {
            bombSprite.setVisible(true)
            bombSprite.play("explode")
            bombSprite.x = hoverSprite.x
            bombSprite.y = hoverSprite.y
            this.time.delayedCall(500, ()=>{
                music.stop()
                this.scene.start("Scene1")
            }, [], this)
            
        })
   
        this.sound.pauseOnBlur = true
    
    }

    update () {

    }

   
}
