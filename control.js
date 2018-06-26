var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

var imageObj = new Image();

imageObj.onload = function() {
  context.drawImage(imageObj, 800, 500); // (x,y, width, height)
      };

imageObj.src = './assets/Game_Background_150.png';

// set canvas width
context.canvas.height = 500;
context.canvas.width = 800;

// player
rectangle = {

  height:32,
  jumping:true,
  width:32,
  x: 50, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

// movement
controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
    }

  }

};


loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 40;     // jump height
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5; // movement speed

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity; // x axis movement
  rectangle.y += rectangle.y_velocity; // y axis movement
  rectangle.x_velocity *= 0.9;// between 0 - 1, adding friction to movement
  rectangle.y_velocity *= 0.9;

  // collision

  // if rectangle is falling below floor line
  if (rectangle.y > 430 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 430 - 16 - 32;
    rectangle.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {

    rectangle.x = 800;

  } else if (rectangle.x > 800) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }

  // background


  // // player
  context.clearRect(0,0,800,500)
  context.fillStyle = "#ff0000";// hex for red

  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;

  // the line rectangle is resting on
  // context.beginPath(); // start drawing border
  // context.moveTo(0, 380); // move to coordinates without creating line (x, y)
  // context.lineTo(600, 380); // line to coordinates (x, y)
  // context.stroke(); // create stroke

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
