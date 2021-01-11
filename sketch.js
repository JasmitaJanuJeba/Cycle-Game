var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,redRacer, redRacer1, yellowRacer, yellowRacer1, pinkRacer, pinkRacer1, obst1, obst2, obst3; 
var ImgRedRacer,ImgRedRacer1, ImgYellowRacer, ImgYellowRacer1, ImgPinkRacer,ImgPinkRacer1,ImgObst1, ImgObst2, ImgObst3, pinkCG, redCG, yellowCG, gameOver, gameEnd, cycleBell, CycleBell, obst;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0, restart;

function preload(){
pathImg = loadImage("Road.png");
  
mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
mainRacerImg2= loadAnimation("mainPlayer3.png");
  
ImgRedRacer = loadAnimation("opponent8.png","opponent7.png");
ImgRedRacer1 = loadAnimation("opponent9.png");
  
ImgYellowRacer = loadAnimation("opponent5.png","opponent4.png");
ImgYellowRacer1 = loadAnimation("opponent6.png");
  
ImgPinkRacer = loadAnimation("opponent2.png","opponent1.png");
ImgPinkRacer1 = loadAnimation("opponent3.png");
  
ImgObst1 = loadAnimation("obstacle1.png");
ImgObst2 = loadAnimation("obstacle2.png");
ImgObst3 = loadAnimation("obstacle3.png");
  
gameOver = loadImage("gameOver.png");
cycleBell = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(displayWidth/3, displayHeight/4);

// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameEnd = createSprite(300, 150); 
gameEnd.addImage(gameOver);
gameEnd.scale = 0.8;
gameEnd.visible= false;
  
pinkCG = new Group();
redCG = new Group();
yellowCG = new Group();
}

function draw() {
  //mainCyclist.collide(pinkCG);
  //mainCyclist.collide(yellowCG);
  //mainCyclist.collide(redCG);
  background(0);
   drawSprites();  
  
 //console.log(selectPlayer);

  textSize(20);
  fill(255);
 text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
   path.velocityX = -(6+2*distance/150);
   mainCyclist.y = World.mouseY;
  distance =distance+Math.round(getFrameRate()/50);
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
     
  }
 if(keyDown("space")){
    cycleBell.play();
    }  
    var selectPlayer = Math.round(random(1,3)); 
    if(World.frameCount% 150 == 0){
    if(selectPlayer ==1){
      pinkCyclist();
    }else if(selectPlayer==2){
      redCyclist();
    }else{
      yellowCyclist();
    }
    }
    
  obstacles();  
  if(pinkCG.isTouching(mainCyclist)){
gameState = END;
pinkRacer.velocityY=0;
pinkRacer.addAnimation("PinkRacer",ImgPinkRacer1)
    } 
   if(redCG.isTouching(mainCyclist)){
gameState = END;
redRacer.velocityY = 0;
redRacer.addAnimation("RedRacer",ImgRedRacer1 )
    } 
   if(yellowCG.isTouching(mainCyclist)){
gameState = END;
yellowRacer.velocityY = 0;
yellowRacer.addAnimation("YellowRacer",ImgYellowRacer1);
    
 } 
   }   
 else if(gameState===END){
   gameEnd.visible=true;
   textSize(20);
   fill(255);
   text("Press Up Arrow to Restart",200, 200);
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2 );
     pinkCG.setVelocityXEach(0);
     pinkCG.setLifetimeEach(-1);
   
     yellowCG.setVelocityXEach(0);
     yellowCG.setLifetimeEach(-1);
   
     redCG.setVelocityXEach(0);
   redCG.setLifetimeEach(-1);   
 
if(keyDown("UP_ARROW")){
   reset();
   } 
}
}
function pinkCyclist(){
  pinkRacer = createSprite(300, Math.round(random(50, 250), 10, 10));
  pinkRacer.scale = 0.06;
  pinkRacer.addAnimation("PinkRacer",ImgPinkRacer);
  pinkRacer.setLifetime = 170;
  pinkRacer.velocityX =-(6 + 2*distance/150);
  pinkCG.add(pinkRacer);
}
function redCyclist(){
  redRacer = createSprite(300, Math.round(random(50, 250), 10, 10));
  redRacer.scale = 0.06;
  redRacer.addAnimation("RedRacer",ImgRedRacer);
  redRacer.setLifetime = 170;
  redRacer.velocityX = -(6 + 2*distance/150);
  redCG.add(redRacer);
}
function yellowCyclist(){
 yellowRacer = createSprite(300, Math.round(random(50, 250), 10, 10));
  yellowRacer.scale = 0.06;
  yellowRacer.addAnimation("YellowRacer",ImgYellowRacer);
  yellowRacer.setLifetime = 170;
  yellowRacer.velocityX = -(6 + 2*distance/150);
  yellowCG.add(yellowRacer);
}
function reset(){
  gameState = PLAY;
  gameEnd.visible = false; 
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}
