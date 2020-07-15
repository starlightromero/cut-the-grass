// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle
 */

let drop1, drop2, drop3, drop4, drop5, drop6, drop7, dropSound, blade1, blade2

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100, 100);
  // Variables for droplet 1
  drop1 = new RainDrop(12)
  drop2 = new RainDrop(15)
  drop3 = new RainDrop(8)
  drop4 = new RainDrop (4)
  drop5 = new RainDrop (10)
  drop6 = new RainDrop (3)
  drop7 = new RainDrop (6)
  
  blade1 = new Grass(10)
  blade2 = new Grass(40)
  
}

function draw() {
  background(0, 0, 95);

  // Move droplets

  drop1.drip()
  drop2.drip()
  drop3.drip()
  drop4.drip()
  drop5.drip()
  drop6.drip()
  drop7.drip()
 
//   display droplets
  drop1.show()
  drop2.show()
  drop3.show()
  drop4.show()
  drop5.show()
  drop6.show()
  drop7.show()
  
//   display grass
  blade1.show()
  blade2.show()
  
 
  

}

// define Raindrop class 

class RainDrop {
  constructor(diameter) {
    this.x = random(width)
    this.y = 0
    this.diameter = diameter
    this.fallSpeed = 0.8 * diameter
  }
  
  show() {
    //   Display droplets 
  noStroke()
  fill(179, 79, 80)
  ellipse(this.x, this.y, this.diameter)
  }
  
  drip() {
    this.y += this.fallSpeed
    
    if (this.y > height) {
      this.y = 0
      this.x = random(width)
      // dropSound.play()
      blade1.grow()
      blade2.grow()
      
    }
  } 
}

class Grass {
  constructor(x, y, tri1x, tri1y, tri2x, tri2y, tri3x, tri3y) {
    this.x = x
    this.y = 500
    this.width = 5
    this.height = 0
    this.growSpeed = 3
//     triangle coordinates to sit atop rectangle
    this.tri1x = this.x
    this.tri1y = this.y
    this.tri2x = this.x + this.width
    this.tri2y = this.y + this.width
    this.tri3x = this.x + 5
    this.tri3y = this.y + 5
    
  }
  
  show() {
    noStroke() 
    fill(131, 79, 80)
    rect(this.x, this.y, this.width, this.height)
    triangle(this.tri1x, this.tri1y, this.tri2x, this.tri2y, this.tri3x, this.tri3y)
  }
  
  grow () {
    if (this.height > -300)
     this.height -= this.growSpeed
  }
}