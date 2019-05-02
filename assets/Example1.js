class Example1 extends Phaser.Scene {

    constructor() {
        super({key: "Example1"})
    }
    
    preload() {
        this.load.atlas('player', './assets/sprites.png', './assets/sprites.json')
        this.load.image('bg', './assets/map.png')
    }

    create() {
    
    this.add.image(400, 300, 'bg')
    this.player = this.physics.add.sprite(100, 150, 'player', 'bomb11.png')
   this.anims.create({
        key:'idle',
       frameRate: 8,
       repeat: -1,
       frames: this.anims.generateFrameNames('player', {
           prefix: 'bomb',
           suffix: '.png',
           start: 11,
           end: 14,
           zeroPad: 2 
       } )
    })   
    this.anims.create({
        key:'up',
       frameRate: 8,
       repeat: -1,
       frames: this.anims.generateFrameNames('player', {
           prefix: 'bomb',
           suffix: '.png',
           start: 21,
           end: 23,
           zeroPad: 2 
       } )
    })   
    this.anims.create({
        key:'down',
       frameRate: 8,
       repeat: -1,
       frames: this.anims.generateFrameNames('player', {
           prefix: 'bomb',
           suffix: '.png',
           start: 6,
           end: 8,
           zeroPad: 2 
       } )
    })   
    this.anims.create({
        key:'left',
       frameRate: 8,
       repeat: -1,
       frames: this.anims.generateFrameNames('player', {
           prefix: 'bomb',
           suffix: '.png',
           start: 11,
           end: 14,
           zeroPad: 2 
       } )
    })   
    this.anims.create({
        key:'right',
       frameRate: 8,
       repeat: -1,
       frames: this.anims.generateFrameNames('player', {
           prefix: 'bomb',
           suffix: '.png',
           start: 18,
           end: 20,
           zeroPad: 2 
       } )
    })   
    
   
    }
    update() {
       
       let  cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
}
else
{
    this.player.setVelocityX(0);

    this.player.anims.play('idle');
}


    }
}