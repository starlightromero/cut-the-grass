// Name any p5.js functions we use in `global` so Glitch can recognize them.
/*  global
 *  HSB, background, color, colorMode, createCanvas, ellipse, fill, height, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, map
 *  noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle, collidePointCircle, collideRectRect, collidePointRect, keyCode, keyPressed
 *  loadImage, image, loadFont, textAlign, CENTER, textFont, time, rotate, collideRectCircle, windowWidth, windowHeight, Grass, Dirt, Mower, Sun
 *  Display
*/

let dropSound
let blades = []
let drops = []
let clouds = []
let lawnMower
let mowerLeft
let mowerRight
let dirt
let sun
let raining
let titleFont
let display


function preload() {
  mowerLeft = loadImage('https://cdn.glitch.com/f4d46d84-c571-4140-b60d-740161a7e037%2Fmower-left.png?v=1594916808200')
  mowerRight = loadImage('https://cdn.glitch.com/f4d46d84-c571-4140-b60d-740161a7e037%2Fmower-right.png?v=1594916817885')
  titleFont = loadFont('https://cdn.glitch.com/f4d46d84-c571-4140-b60d-740161a7e037%2FTypo_Round_Regular_Demo.otf?v=1594942077138')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 100, 100)
  // Variables for droplet 1
  
  for (let i = 0; i < 4; i++) {
    clouds[i] = new Cloud
  }
  
  for(let i = 0; i < 45; i++) {
    blades[i] = new Grass()
  }
  
  lawnMower = new Mower
  dirt = new Dirt
  sun = new Sun
  
  raining = true
  
  textFont(titleFont)
  textSize(width/15)
  textAlign(CENTER, CENTER)
  
  display = new Display
  
}

function draw() {
  
  display.show()
  display.background
  
  if (raining) {
    for (const cloud of clouds) {
      cloud.show()
      cloud.move()
      for (const cloudParticle of cloud.cloudParticles) {
        drops.push() = new RainDrop(cloudParticle.x, cloudParticle.y, cloud.diameter)
      }
    }
    for (const blade of blades) {
      blade.show()
    }
  } else {
    sun.show()
    for (const blade of blades) {
      blade.show()
    }
    lawnMower.show()
  }

  dirt.show()
  if (display.info) {
    text(display.title.toUpperCase(), width/2, height/2)
  }
  setTimeout(display.clear, 3000)
}

function keyPressed() {
  if (raining === false && keyCode === LEFT_ARROW && lawnMower.x > 0) {
    lawnMower.left(20)
  } else if (raining === false && keyCode === RIGHT_ARROW && lawnMower.x < width - lawnMower.width) {
    lawnMower.right(20)
  } else if (raining === false && keyCode === DOWN_ARROW && lawnMower.y < height - lawnMower.height - dirt.height) {
    lawnMower.down(20)
  } else if (raining === false && keyCode === UP_ARROW && lawnMower.y > 0) {
    lawnMower.up(20)
  }
  
  for (const blade of blades) {
    let cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height)
    if (cutGrass && blade.height > dirt.height) {
      lawnMower.cut(blade)
      lawnMower.shavings()
    }
    
    function allCut(blade) {
      return blade.height === dirt.height
    }
    
    if (blades.every(allCut)) {
      raining = true
    }
  }  
}

class Cloud {
  constructor() {
    this.x = random(50, 450)
    this.y = random(30, 200)
    this.diameter = random(5, 50)
    this.speed = this.diameter * 0.01
    this.cloudParticles = [
      {
        x: this.x,
        y: this.y
      },
      {
        x: this.x + this.diameter / 8*5,
        y: this.y + this.diameter / 4
      },
      {
        x: this.x + this.diameter / 4*5,
        y: this.y + this.diameter / 2
      },
      {
        x: this.x - this.diameter / 8*5, 
        y: this.y + this.diameter / 4 
      },
      {
        x: this.x - this.diameter / 4*5,
        y: this.y + this.diameter / 2 
      },
      {
        x: this.x - this.diameter / 8*5,
        y: this.y + this.diameter / 4*3
      },
      {
        x: this.x + this.diameter / 8*5, 
        y: this.y + this.diameter / 4*3
      },
      {
        x: this.x, 
        y: this.y + this.diameter
      },
      {
        x: this.x,
        y: this.y + this.diameter / 2
      }]
  }
  
   show() {
    noStroke()
    fill(0, 0, 40)
    for (const cloudParticle of this.cloudParticles) {
      ellipse(cloudParticle.x, cloudParticle.y, this.diameter)
    }
  }
  
  
  move() {
    if (this.x - (this.diameter/4*5 - this.diameter) < width) {
      this.x += this.speed
      for (const cloudParticle of this.cloudParticles) {
        cloudParticle.x += this.speed  
      }
    } else {
      this.x = 0 - this.diameter/4*5 - this.diameter
    }
  }
}

class RainDrop {
  constructor(x, y, d) {
    this.x = x
    this.y = y
    this.diameter = d / 3
    this.fallSpeed = 0.8 * this.diameter
    this.triX1 = this.x - this.diameter/2
    this.triY1 = this.y
    this.triX2 = this.x + this.diameter/2
    this.triY2 = this.y
    this.triX3 = this.x
    this.triY3 = this.y - this.diameter
  }
  
  show() {
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
      let hit = collideRectCircle(blade.x, blade.y, blade.width, blade.height, this.x, this.y, this.diameter)
      if (hit) {
        blade.grow(this.diameter)
      }
    }
  }
    
  reset() {
    if (this.y > height) {
      this.x = random(clouds.map(cloud => cloud.x += cloud.speed))
      this.y = random(clouds.map(cloud => cloud.y))
      this.triX1 = this.x - this.diameter/2
      this.triY1 = this.y
      this.triX2 = this.x + this.diameter/2
      this.triY2 = this.y 
      this.triX3 = this.x
      this.triY3 = this.y - this.diameter  
    }
  }
  
  rain() {
    function maxHeight(blade) {
      return blade.height > 300
    }
    
    if (blades.every(maxHeight)) {
      raining = false
      lawnMower.reset()
    } else {
      this.drip()
      this.reset()
    }
  }
}
