// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, map
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle, collidePointCircle, collideRectRect, collidePointRect, keyCode, keyPressed
 *    loadImage, image
 */

let dropSound
let blades = []
let drops = []
let lawnMower
let sun
let clouds = []
let mowerLeft
let mowerRight


function preload() {
  mowerLeft = loadImage('https://cdn.glitch.com/f4d46d84-c571-4140-b60d-740161a7e037%2Fmower-left.png?v=1594916808200')
  mowerRight = loadImage('https://cdn.glitch.com/f4d46d84-c571-4140-b60d-740161a7e037%2Fmower-right.png?v=1594916817885')
}

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100, 100);
  // Variables for droplet 1
  for (let i = 0; i < 50; i++) {
    drops[i] = new RainDrop(random(3, 18))
  }
  
  for(let i = 0; i < 45; i++) {
    blades[i] = new Grass(random(width))
  }
  
  lawnMower = new Mower
  sun = new Sun
  
  for(let i = 0; i < 4; i++) {
    clouds[i] = new Cloud
  }
}

function draw() {
  function maxLength(blade) {
    return blade.growing === false
  }
  
  if (blades.every(maxLength)) {
    background(200, 19, 100)
    sun.show()
    for (const drop of drops) {
      drop.drip()
      drop.show()
    }
    for (const blade of blades) {
      blade.show()
    }
    // lawnMower.show()
  } else {
    background(0, 0, 80)
    lawnMower.show()
    for (const cloud of clouds) {
      cloud.show()
      cloud.move()
    }
    for (const drop of drops) {
      drop.rain()
      drop.show()
    }
    for (const blade of blades) {
      blade.show()
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && lawnMower.x > 0) {
    lawnMower.left(30)
  } else if (keyCode === RIGHT_ARROW && lawnMower.x < width - lawnMower.width) {
    lawnMower.right(30)
  } else if (keyCode === DOWN_ARROW && lawnMower.y < height - lawnMower.height) {
    lawnMower.down(30)
  } else if (keyCode === UP_ARROW && lawnMower.y > 0) {
    lawnMower.up(30)
  }
  
  for (const blade of blades) {
    let cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height)
    // console.log(cutGrass)
    // let cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height) || collidePointRect(blade.triX, blade.triY3, lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height)
    if (cutGrass) {
      blade.height += lawnMower.height
      console.log(blade.height)
    }
  }  
}

class Cloud {
  constructor() {
    this.x = random(50, 450)
    this.y = random(30, 200)
    this.diameter = random(5, 50)
    this.speed = this.diameter * 0.01
  }
  
  show() {
    noStroke()
    fill(0, 0, 40)
    ellipse(this.x, this.y, this.diameter)
    ellipse(this.x+this.diameter/8*5, this.y+this.diameter/4, this.diameter)
    ellipse(this.x+this.diameter/4*5, this.y+this.diameter/2, this.diameter)
    ellipse(this.x-this.diameter/8*5, this.y+this.diameter/4, this.diameter)
    ellipse(this.x-this.diameter/4*5, this.y+this.diameter/2, this.diameter)
    ellipse(this.x-this.diameter/8*5, this.y+this.diameter/4*3, this.diameter)
    ellipse(this.x+this.diameter/8*5, this.y+this.diameter/4*3, this.diameter)
    ellipse(this.x, this.y+this.diameter, this.diameter)
    ellipse(this.x, this.y+this.diameter/2, this.diameter)
  }
  
  move() {
    if (this.x - (this.diameter/4*5 - this.diameter) < width) {
      this.x += this.speed
    } else {
      this.x = 0 - this.diameter/4*5 - this.diameter
    }
  }
}

// define Raindrop class 

class RainDrop {
  constructor(diameter) {
    // console.log(this.x)
    this.x = random(50, 450)
    // console.log(this.y)
    this.y = random(30, 200)
    this.diameter = diameter
    this.fallSpeed = 0.8 * this.diameter
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
    let dropShape = ellipse(this.x, this.y, this.diameter) && triangle(this.triX1, this.triY1, this.triX2, this.triY2, this.triX3, this.triY3)  
  }
  
  drip() {
    this.y += this.fallSpeed
    this.triY1 += this.fallSpeed
    this.triY2 += this.fallSpeed
    this.triY3 += this.fallSpeed
    
    for (const blade of blades) {
      let hit = collidePointCircle(blade.x, blade.y, this.x, this.y, this.diameter)
      if (hit) {
        blade.grow(this.diameter)
      }
    }
  }
    
  reset() {
    if (this.y > height) {
      this.x = random(50, 450)
      this.y = random(30, 200)
      this.triX1 = this.x - this.diameter/2
      this.triY1 = this.y
      this.triX2 = this.x + this.diameter/2
      this.triY2 = this.y 
      this.triX3 = this.x
      this.triY3 = this.y - this.diameter  
    }
  }
  
  rain() {
    this.drip()
    this.reset()
  }
}

class Grass {
  constructor(x) {
    this.x = x
    this.y = 500
    this.width = 3
    this.height = 0
    this.growing = true
//     triangle coordinates to sit atop rectangle
    this.tri1x = this.x 
    this.tri1y = this.y - this.height
    this.tri2x = this.x + this.width
    this.tri2y = this.y - this.height
    this.tri3x = this.x 
    this.tri3y = this.y - this.width
    
  }
  
  show() {
    noStroke() 
    fill(131, 79, 80)
    rect(this.x, this.y, this.width, this.height)
    triangle(this.tri1x, this.tri1y, this.tri2x, this.tri2y, this.tri3x, this.tri3y)
  }
  
  grow(dropSize) {
    if (this.height > -300) {
      let growSpeed = dropSize/2
      this.height -= growSpeed
      this.tri1y -= growSpeed
      this.tri2y -= growSpeed
      this.tri3y -= growSpeed
    } else {
      this.growing = false
    }
  }
}


class Sun {
  constructor() {
    this.x = 400
    this.y = 70
    this.diameter = 100
  }
  
  show() {
    noStroke()
    fill(60, 70, 100)
    ellipse(this.x, this.y, this.diameter)  
  }
}

class Mower {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = 90
    this.height = 90
    this.img = mowerRight
  }
  
  show() {
    image(this.img, this.x, this.y, this.width, this.height)
  }
  
  right(x) {
    this.x += x
    this.img = mowerRight
    this.show()
  }
  
  left(x) {
    this.x -= x
    this.img = mowerLeft
    this.show()
  }
  
  down(y) {
    this.y += y
    this.show()
  }
  
  up(y) {
    this.y -= y
    this.show()
  }
}