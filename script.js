// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle
 */

let dropSound
let blades = []
let drops = []

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100, 100);
  // Variables for droplet 1
  for (let i = 0; i < 8; i++) {
    drops[i] = new RainDrop(random(3, 18))
  }
  
  for(let i = 0; i < 45; i++) {
    blades[i] = new Grass(random(width))
  }
  
}

function draw() {
  background(0, 0, 95);

  // Move droplets

  for (const drop of drops) {
    drop.drip()
  }
 
//   display droplets
  for (const drop of drops) {
    drop.show()
  }
  
//   display grass
  for (const blade of blades) {
    blade.show()
  }
}

// define Raindrop class 

class RainDrop {
  constructor(diameter) {
    this.x = random(width)
    this.y = 0
    this.diameter = diameter
    this.fallSpeed = 0.8 * diameter
    this.triX1 = this.x - this.diameter/2
    this.triY1 = this.y
    this.triX2 = this.x + this.diameter/2
    this.triY2 = this.y 
    this.triX3 = this.x
    this.triY3 = this.y - this.diameter  
  }
  
  show() {
    //   Display droplets 
    noStroke()
    fill(179, 79, 80)
    ellipse(this.x, this.y, this.diameter)
    triangle(this.triX1, this.triY1, this.triX2, this.triY2, this.triX3, this.triY3)
  }
  
  drip() {
    this.y += this.fallSpeed
    this.triY1 += this.fallSpeed
    this.triY2 += this.fallSpeed
    this.triY3 += this.fallSpeed
    
    if (this.y > height) {
      this.y = 0
      this.x = random(width)
      this.triX1 = this.x - this.diameter/2
      this.triY1 = this.y
      this.triX2 = this.x + this.diameter/2
      this.triY2 = this.y 
      this.triX3 = this.x
      this.triY3 = this.y - this.diameter  
      // dropSound.play()
      for (const blade of blades) {
        let hit = collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
        blade.grow()
      }
      
    }
  } 
}

class Grass {
  constructor(x, y) {
    this.x = x
    this.y = 500
    this.width = 5
    this.height = 0
    this.growSpeed = 1.2 * this.width
//     triangle coordinates to sit atop rectangle
    this.tri1x = this.x 
    this.tri1y = this.y - this.height
    this.tri2x = this.x + 5
    this.tri2y = this.y - this.height
    this.tri3x = this.x 
    this.tri3y = this.y - 5
    
  }
  
  show() {
    noStroke() 
    fill(131, 79, 80)
    rect(this.x, this.y, this.width, this.height)
    triangle(this.tri1x, this.tri1y, this.tri2x, this.tri2y, this.tri3x, this.tri3y)
  }
  
  grow () {
    if (this.height > -300) {
      this.height -= this.growSpeed
      this.tri1y -= this.growSpeed
      this.tri2y -= this.growSpeed
      this.tri3y -= this.growSpeed
    }
  }
  
  mowLawn () {
    if ()
  }
}