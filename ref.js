var rad=15,snake=[];
var theSnakeMoveDirection="left";
var egs,playingButton,score,refreshButton;
var gameContinued=true,gameOverB=false;
class snakeParticle{
    constructor(x,y,n) {
        this.pos=createVector(x,y);
        this.prevPos=createVector(x,y);
        this.n=n; 
    }
    update(x,y){
        if((x>=width || y>=height || x<=0 || y<=0) || (this.pos.equals(snake[0].pos) && this.n!==1)){
            gameOver(); 
        }else {
          this.prevPos.set(this.pos);
          this.pos.set(x,y);
        }
    }
    show(){
      vertex(this.pos.x,this.pos.y);
    }
}
function setup(){
    playingButton=createButton("Pouse");
    playingButton.mouseClicked(gamePlaying);
    refreshButton=createButton("Refresh");
    refreshButton.mouseClicked(refreshGame);
    score=createButton(" ");
    createCanvas(windowWidth-50,windowHeight-100);
    refreshButton.size(width/3,50);
    playingButton.size(width/3,50);
    score.size(width/3,50);
    frameRate(15);
    stroke("white");
    strokeWeight(rad);
    noFill();
    snake.push(new snakeParticle(floor(random(width/rad/2,width/rad))*rad,floor(random(rad,height/rad))*rad,1));
    egsEat();
    textFont('Helvetica');
}
function draw(){
    background(51);
    beginShape();
    snakeMove();
    endShape();
    score.html(snake.length-2);
}
function snakeMove(){
  for (var i = 0; i < snake.length; i++) {
    if(i!==0){
       snake[i].update(snake[i-1].prevPos.x,snake[i-1].prevPos.y);
    }else{
      var x=snake[i].pos.x;
      var y=snake[i].pos.y;
       switch(theSnakeMoveDirection) {
          case "left":
              snake[i].update(x-rad,y);
              break;
          case "right":
              snake[i].update(x+rad,y);
              break;
          case "up":
              snake[i].update(x,y-rad);
              break;
          case "down":
              snake[i].update(x,y+rad);
              break;
          default:
              return false;
        }
    }
    snake[i].show();
    }
    checkEgs();
  }
  function keyPressed(){
    switch(keyCode) {
          case LEFT_ARROW:
              if(theSnakeMoveDirection!=="right") theSnakeMoveDirection="left";
              break;
          case RIGHT_ARROW:
              if(theSnakeMoveDirection!=="left") theSnakeMoveDirection="right";
              break;
          case UP_ARROW:
              if(theSnakeMoveDirection!=="down") theSnakeMoveDirection="up";
              break;
          case DOWN_ARROW:
              if(theSnakeMoveDirection!=="up") theSnakeMoveDirection="down";
              break;
      }
  }
  function checkEgs(){
      if(snake[0].pos.equals(egs)){
          egsEat();
      }
      point(egs.x,egs.y);
  }
  function egsEat(){
      egs=createVector(floor(random(1,(width/rad)-1))*rad,floor(random(1,(height/rad)-1))*rad);
      snake.push(new snakeParticle(snake[snake.length-1].pos.x,snake[snake.length-1].pos.y,snake.length+1));
      stroke(color(255*noise(snake.length+10),255*noise(snake.length+15),255*noise(snake.length+20)));
      refreshButton.style("color",color(255*noise(snake.length+10),255*noise(snake.length+15),255*noise(snake.length+20)));
    playingButton.style("color",color(255*noise(snake.length+10),255*noise(snake.length+15),255*noise(snake.length+20)));
    score.style("color",color(255*noise(snake.length+10),255*noise(snake.length+15),255*noise(snake.length+20)));
  }
  function gameOver(){
      noLoop();
      gameOverB=true;
      textSize(width/6);
      text("Game Over",10,width/4);
  }
  function refreshGame(){
      gameOverB=false;
      snake=[];
      snake.push(new snakeParticle(floor(random(width/rad/2,width/rad))*rad,floor(random(height/rad))*rad,1));
      egsEat();
      theSnakeMoveDirection="left";
      loop();
      playingButton.html("Pouse");
        gameContinued=true;
  }
  function gamePlaying(){
    if(!gameOverB){
      if(gameContinued) {
        noLoop();
        playingButton.html("Play");
      }
      else {
        loop();
        playingButton.html("Pouse");
      }
      gameContinued=(!gameContinued);
    }
  }