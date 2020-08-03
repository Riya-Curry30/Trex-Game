var trex, trexCollided,trexRunning;
var ground,invisibleGround,groundImage;
var cloudImage, cloudGroup;
var osbtacle1, osbtacle2, osbtacle3, osbtacle4, osbtacle5, osbtacle6, obstacleGroup;
var count;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartImage, gameOverImage, gameOver, restart;


function preload()
{
 trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
 trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  
}
  

function setup() 
{
  createCanvas(600, 200);
  //create a trex sprite
  trex = createSprite(200,180,20,50);
  trex.addAnimation("trex",trexRunning);
  
  trex.addAnimation("trexColliding", trexCollided);
  
  //scale and position the trex
  trex.scale = 0.5;
  trex.x = 50;

  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;

  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;

  invisibleGround = createSprite(200,190, 400,20);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
   count = 0;
  
  
}

function draw() {
  background(250);
  
  if(gameState === PLAY){
    //move the ground
    
    //scoring
    count = count +  Math.round(getFrameRate()/60);
    
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
    
    
     //jump when the space key is pressed
    if(keyDown("space") )
    {
      trex.velocityY = -12 ;
    }
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstacleGroup.isTouching(trex))
    {
      gameState = END;
    }
  }
  
  else if(gameState === END)
  {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided", trexCollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }
  
  
  if(mousePressedOver(restart)) 
  {
    reset();
  }

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 text("Score:"+ count, 430, 15);
  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudImage );
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles()
{
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    //var rand = random(1,6);
    //obstacle.setAnimation("obstacle" + rand);
    
  //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
    { case 1: obstacle.addImage(obstacle1);
        break; 
        case 2: obstacle.addImage(obstacle2); 
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4); 
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6); 
        break;
        default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function reset()
{
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("trex", trexRunning);
  
  count = 0;
  
}
