const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

//Necessary variables, FPS,radius,xp,yp,xv,yv
const FPS = 60; /*FPS=> Frames per second */
let radius = 50;
let xP, yP;
let xV, yV; /* horizontal velocity, and vertical velocity */
/*Velocity means speed plus direction*/

/*To position "the center of the ball"
in the middle of the canvas
by vertically and horizonally */
xP = canvasEl.width / 2;
yP = canvasEl.height / 2;

/*Generate "random velocities"
Math.random give us a number between 0-1
for 1=> the maximum velocity of the ball is =>300
for 0=> the minumum velocity of the ball is>99
Math.floor(Math.random() * 201 + 99)
gives us "pixels per second"
but we want "pixels per frame"
"not per second"
we have "frames per second"

How many "pixels in one frame"?
we know "60 frames in one second"
but how many "pixels in one frame" ?
For that we're gonna dive the velocity by FPS
Math.floor(Math.random() * 201 + 99) /FPS
By this the outcome of this velocities
will be "pixels per frame" */
xV = Math.floor(Math.random() * 201 + 99) / FPS;
yV = Math.floor(Math.random() * 201 + 99) / FPS;

// coin toss situation
/* If it's equals to the "0"
for example if its moving in the "right direction"
I wanna change its direction "in the left direction" .
And the same thing for Y direction.
If it moves in the "top direction"
I wanna change its direction to "down direction"*/
if (Math.floor(Math.random() * 2) === 0) {
  xV = -xV;
}

if (Math.floor(Math.random() * 2) === 0) {
  yV = -yV;
}

// The Game Loop
/* There are two way of 
creating game loop.
One way is setting "requestAnimationFrame" function.
And the other way is using "setInterval" function.
In this project I would use "setInterval"function */
function runGame() {
  //----------------- moving the ball from its current position
  /*To be able to move the ball 
  we need to do "2 things"
  We need to change the "position of the circle"
  What is the value 
  that we want to change that position by?
  "We want to change it by its velocity" */
  /*We just wanna "add the velocity
  onto the position of the ball" */
  xP += xV;
  yP += yV;

  //--------------- clearing the canvas
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);

  //------------------- Collision Detection
  //Positive directions (bottom and right boundaries)
  // bottom boundary
  /*What's in charge of moving this ball?
  It's the vertical velocity.
  If the "vertical velocity" is greater than 0
  It means that ball is moving towards the bottom.When velocity is positive
  then its moving to the "bottom"
  */
  /* We're gonna use "logical AND operator"
  AND "the vertical position" is greater than the  canvas's height
  then we wanna "reverse the velocity" */
  /* When the ball "hits the edge",
  canvasEl.height is gonna give us "this bottom part of the canvas"
  When the ball hits that "bottom part"
  we just wanna "move it back" */
  if (yV > 0 && yP >= canvasEl.height - radius) {
    yV = -yV;
  }

  // right boundary
  /* The same thing we did previous project.
  Except that 
  we're checking "ıf the ball is moving in that direction" (velocity)
  "If it's not moving in that direction"
  "we dont wanna do anything"
  that's why we have "4 standalone if statements" */
  /*When the ball hits "the edge of the right"
  we wanna "reverse the velocity"
  we wanna "move it back" */
  if (xV > 0 && xP > canvasEl.width - radius) {
    xV = -xV;
  }

  // top boundary
  /*When the velocity is less than 0
  it means that velocity is "negative"
  negative=> it moving towards to "top" */
  if (yV < 0 && yP <= radius) {
    yV = -yV;
  }

  // left boundary
  if (xV < 0 && xP <= radius) {
    xV = -xV;
  }

  // ----------------Drawing the ball
  canvasContext.beginPath();
  canvasContext.fillStyle = "orange";
  canvasContext.arc(xP, yP, radius, 0, Math.PI * 2);
  canvasContext.fill();
}

// set interval
/* How many times do we want to call the "runGame function"  "per second"? 
1000 milisecond divided by FPS per second */
setInterval(runGame, 1000 / FPS);
