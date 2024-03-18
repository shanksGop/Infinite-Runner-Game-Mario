var bgIm, bg;
var mario, marioAni, marioAni2;
var bowser, bowserAni, bowserAni2;
var fireballs, fireballImg;
var ground;
var inviWall1;
var inviWall2;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var lives, gameOver, gameOverIm;

function preload(){
bgIm = loadImage("Bowsers house.png");
marioAni = loadAnimation("MarioRunning1.png","MarioRunning2.png","MarioRunning3.png","MarioRunning4.png");
marioAni2 = loadAnimation("MarioRunning1.png");
bowserAni = loadAnimation("BowserWalking1.png","BowserWalking2Real.png","BowserWalking3.png");
bowserAni2 = loadAnimation("BowserWalking1.png");
fireballImg = loadImage("Fireball.png");
gameOverIm = loadImage("GameOver.png");
}

function setup() {

createCanvas(600,600);

bg = createSprite(441,300,10,10);
bg.addImage(bgIm);
bg.velocityX = -3;
bg.scale = 1;

mario = createSprite(441,440,10,10);
mario.addAnimation("running",marioAni);
mario.scale = 0.5;

bowser = createSprite(150,425,10,10);
bowser.addAnimation("bowserRunning",bowserAni);
bowser.scale = 2;

fireballs = new Group();

ground = createSprite(300,600,width,237);
ground.visible = false;

inviWall1 = createSprite(300,300,20,height);
inviWall2 = createSprite(500,300,20,height);

gameOver = createSprite(300,300,10,10);
gameOver.addImage(gameOverIm);

lives = 3;
fireballs = new Group();

}

function draw() {
background(255);


//console.log(score)

if(gameState === PLAY){

    gameOver.visible = false;


    if(mario.isTouching(fireballs)){
        lives = lives -1;
        fireballs.destroyEach();
    }

    if(bg.x < 0){
        bg.x = bg.width/2.5;
    }

    spawnFireball();

    mario.collide(ground);
    mario.collide(inviWall1);
    mario.collide(inviWall2);
    mario.velocityY += 0.8
    //mario.debug = true

    if(keyDown(RIGHT)){
        mario.x += 3;
    }

    if(keyDown(LEFT)){
        mario.x += -3;
    }

    if(keyDown("space") && mario.y >= 410){
        mario.velocityY = -15
    }

    inviWall1.visible = false;
    inviWall2.visible = false;

    console.log(lives);

    if(lives === 0){
        gameState = END;   
    }
    score = score + Math .round(frameRate()/10 ) ;

}

if(gameState === END){
    fireballs.setVelocityXEach(0);
    fireballs.destroyEach();
    bg.velocityX = 0;
    mario.x = 441;
    mario.y = 440;
    mario.addAnimation("marioStanding", marioAni2);
    mario.changeAnimation("marioStanding", marioAni2);
    bowser.addAnimation("bowserStanding",bowserAni2);
    bowser.changeAnimation("bowserStanding",bowserAni2);
    gameOver.visible = true;
    if(mousePressedOver(gameOver)){
        reset();
    }

    
}
drawSprites();

fill(255);
text("Lives: " + lives,20,20)
text("Score: "+ score, 500, 20);



}

function spawnFireball(){
    if(frameCount%Math.round(random(80,120))===0){
    fireball = createSprite(150,425,10,10);
    fireball.addImage(fireballImg);
    fireball.depth = mario.depth;
    mario.depth+=1;
    fireball.velocityX = random(3,6)
    fireball.velocityY = random(0.7,0.8);
    //fireball.debug = true;
    fireball.setCollider("circle",0,0,20);
    fireballs.add(fireball);
    }
}
function reset(){
    gameState = PLAY;
    score = 0
    mario.changeAnimation("running",marioAni);
    bowser.changeAnimation("bowserRunning",bowserAni);
    bg.velocityX = -3;
    lives = 3;
    
}