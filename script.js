// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width
 */



function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  let drop1 = new RainDrop(20, 8)
  let drop2 = new RainDrop(15, 6)
  let drop3 = new RainDrops(8, 5)
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  drop1.y += drop1.fallSpeed
  if (drop1.y > height) {
    drop1.y = 0
  }

// define Raindrop class 

class RainDrop {
  constructor(d, fallSpeed) {
    this.x = random(width)
    this.y = 0
    this.d = d
    this.fallSpeed = fallSpeed
  }
  
  
}