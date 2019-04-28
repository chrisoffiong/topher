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
    player = this.add.sprite(100, 150, 'player', 'bomb11.png')
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
        var player
        var cursors
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('idle');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
    }
}