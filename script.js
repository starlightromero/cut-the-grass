// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width
 */

let drop1x, drop1y, drop1d, drop2x, drop2y, drop2d, drop2FallSpeed, drop1FallSpeed;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  drop1x = 200; // or random(width)
  drop1y = 0; // or random(height)
  drop1d = 10; // or random(5,15)
  drop1FallSpeed = 8; // or random(8, 20)
  

  // Variables for droplet 2
  drop2x = random(width)
  drop2y = 0
  drop2d = 10
  drop2FallSpeed = 6
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  drop1y += drop1FallSpeed;
  drop2y += drop2FallSpeed
  // If it goes off the screen...
  if (drop1y > height) {
    // ...reset it...
    drop1y = 0;
    // ...and move it somewhere random.
    drop1x = random(width);
  }
   if (drop2y > height) {
    // ...reset it...
    drop2y = 0;
    // ...and move it somewhere random.
    drop2x = random(width);
  }
  // Display droplet 1
  noStroke();
  fill(60, 80, 80);
  ellipse(drop1x, drop1y, drop1d);

  //// Code for droplet 2
  // Code your next droplet here
  ellipse(drop2x, drop2y, drop2d)
}

class rainDrop {
  constructor(d) {
    this.x = random(width)
    this.y = random(height)
    this.d = d
  }
  
  
}