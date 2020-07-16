// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle, collidePointCircle, collideRectRect, collidePointRect, keyCode, keyPressed
 */

let dropSound
let blades = []
let drops = []
let lawnMower
let sun
let clouds = []

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
    let x = random(50, 450)
    let y = random(30, 200)
    let d = random(5, 50)
    clouds[i] = new Cloud(x, y, d)
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
  if (keyCode === LEFT_ARROW && lawnMower.x > 0 + lawnMower.width) {
    lawnMower.x -= 30
  } else if (keyCode === RIGHT_ARROW && lawnMower.x < width - lawnMower.width) {
    lawnMower.x += 30
  } else if (keyCode === DOWN_ARROW && lawnMower.y < height - lawnMower.height) {
    lawnMower.y += 30
  } else if (keyCode === UP_ARROW && lawnMower.y > 0 + lawnMower.height) {
    lawnMower.y -= 30
  }
  
  for (const blade of blades) {
    let cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height)
    // console.log(cutGrass)
    // let cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height) || collidePointRect(blade.triX, blade.triY3, lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height)
    // if (cutGrass) {
    //   blade.height += lawnMower.mowerHeight
    // }
  }  
}

// define Raindrop class 

class RainDrop {
  constructor(diameter) {
    this.x = random(clouds)
    this.y = 0
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
    ellipse(this.x, this.y, this.diameter)
    triangle(this.triX1, this.triY1, this.triX2, this.triY2, this.triX3, this.triY3)
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
      this.y = 0
      this.x = random(width)
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
    this.width = 5
    this.height = 0
    this.growing = true
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

class Cloud {
  constructor(x, y, d) {
    this.x = x
    this.y = y
    this.diameter = d
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
    if ((this.x-this.diameter/4*5) - this.diameter < width) {
      this.x += 0.3
    } else {
      this.x = 0 - this.diameter/4*5 - this.diameter
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
    this.width = 20
    this.height = 20
  }
  
  show() {
    fill(0)
    rect(this.x, this.y, this.width, this.height)
  }
}