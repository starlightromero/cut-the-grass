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
  
  for (let i = 0; i < 4; i++) {
    clouds[i] = new Cloud
  }
  
  for (const cloud of clouds) {
    let result = []
    for (const cloudParticle of cloud.cloudParticles) {
      result.push(cloudParticle)
    }
    const chosenResult = random(result)
    drops.push(new RainDrop(chosenResult.x, chosenResult.y, chosenResult.d))
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
    for (const drop of drops) {
      drop.show()
      drop.rain()
      if (drop.y > height) {
        const index = drops.indexOf(drop)
        drops.splice(index, 1)
      }
    }
    for (const cloud of clouds) {
      cloud.show()
      cloud.move()
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
    this.speed = this.diameter * 0.02
    this.cloudParticles = [
      {
        x: this.x,
        y: this.y,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 8*5,
        y: this.y + this.diameter / 4,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 4*5,
        y: this.y + this.diameter / 2,
        d: this.diameter
      },
      {
        x: this.x - this.diameter / 8*5, 
        y: this.y + this.diameter / 4,
        d: this.diameter
      },
      {
        x: this.x - this.diameter / 4*5,
        y: this.y + this.diameter / 2,
        d: this.diameter 
      },
      {
        x: this.x - this.diameter / 8*5,
        y: this.y + this.diameter / 4*3,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 8*5, 
        y: this.y + this.diameter / 4*3,
        d: this.diameter
      },
      {
        x: this.x, 
        y: this.y + this.diameter
      },
      {
        x: this.x,
        y: this.y + this.diameter / 2
      }
    ]
  }
  
   show() {
    noStroke()
    fill(0, 0, 40)
    for (const cloudParticle of this.cloudParticles) {
      ellipse(cloudParticle.x, cloudParticle.y, this.diameter)
    }
  }
  
  reset() {
    this.x = 0 - this.diameter/4*5 - this.diameter
    this.cloudParticles[0].x = this.x
    this.cloudParticles[1].x = this.x + this.diameter / 8*5
    this.cloudParticles[2].x = this.x + this.diameter / 4*5
    this.cloudParticles[3].x = this.x - this.diameter / 8*5
    this.cloudParticles[4].x = this.x - this.diameter / 4*5
    this.cloudParticles[5].x = this.x - this.diameter / 8*5
    this.cloudParticles[6].x = this.x + this.diameter / 8*5
    this.cloudParticles[7].x = this.x
    this.cloudParticles[8].x = this.x
  }
  
  move() {
    if (this.x - this.diameter/ 4*5 - this.diameter < width) {
      this.x += this.speed
      for (const cloudParticle of this.cloudParticles) {
        cloudParticle.x += this.speed
      }
    } else {
      this.reset()
    }
  }
}

class RainDrop {
  constructor(x, y, d) {
    this.x = x
    this.y = y
    this.diameter = d / 3
    this.fallSpeed = 1 * this.diameter
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
    ellipse(this.x, this.y, this.diameter) && triangle(this.triX1, this.triY1, this.triX2, this.triY2, this.triX3, this.triY3)  
  }
  
  reset() {
    if (this.y > height) {
      let result = []
      for (const cloud of clouds) {
        for (const cloudParticle of cloud.cloudParticles) {
          result.push(cloudParticle)
        }
      }
      const chosenResult = random(result)
      console.log(chosenResult)
      this.x = chosenResult.x
      this.y = this.inital.y
      this.diameter = chosenResult.d / 3
      this.fallSpeed = this.diameter
      this.triX1 = this.x - this.diameter/2
      this.triY1 = this.y
      this.triX2 = this.x + this.diameter/2
      this.triY2 = this.y 
      this.triX3 = this.x
      this.triY3 = this.y - this.diameter  
    }
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
