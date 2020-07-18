// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, map
 *    noStroke, random, strokeWeight, text, textSize, width, loadSound, rect, triangle, collidePointCircle, collideRectRect, collidePointRect, keyCode, keyPressed
 *    loadImage, image, loadFont, textAlign, CENTER, textFont, time, rotate, collideRectCircle
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
  createCanvas(500, 500);
  colorMode(HSB, 100, 100);
  // Variables for droplet 1
  
  for(let i = 0; i < 4; i++) {
    clouds[i] = new Cloud
  }
  
  for (let i = 0; i < 50; i++) {
    drops[i] = new RainDrop()
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
      drop.rain()
      drop.show()
    }
    for (const cloud of clouds) {
      cloud.show()
      cloud.move()
      // cloud.update()
    }
    for (const blade of blades) {
      blade.show()
    }
  } else {
    sun.show()
    for (const drop of drops) {
      drop.drip()
      drop.show()
    }
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
    // ellipse(this.ellipse1x, this.ellipse1y, this.diameter)
    ellipse(this.cloudParticles[0].x, this.cloudParticles[0].y, this.diameter)
    ellipse(this.cloudParticles[1].x, this.cloudParticles[1].y, this.diameter)
    ellipse(this.cloudParticles[2].x, this.cloudParticles[2].y, this.diameter)
    ellipse(this.cloudParticles[3].x, this.cloudParticles[3].y, this.diameter)
    ellipse(this.cloudParticles[4].x, this.cloudParticles[4].y, this.diameter)
    ellipse(this.cloudParticles[5].x, this.cloudParticles[5].y, this.diameter)
    ellipse(this.cloudParticles[6].x, this.cloudParticles[6].y, this.diameter)
    ellipse(this.cloudParticles[7].x, this.cloudParticles[7].y, this.diameter)
    ellipse(this.cloudParticles[8].x, this.cloudParticles[8].y, this.diameter)
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




// define Raindrop class 

class RainDrop {
  constructor() {
    console.log(this.x)
    this.x = random(clouds.map((cloud) => {
        let result = cloud.x += cloud.speed
        return result 
    }))
    // this.x = random(50, 450)
    
    this.y = random(clouds.map((cloud) => {
      let result = cloud.y
      // console.log(result)
      return result
    }))
    this.diameter = random(3, 18)
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
      let hit = collideRectCircle(blade.x, blade.y, blade.width, blade.height, this.x, this.y, this.diameter)
      if (hit) {
        blade.grow(this.diameter)
      }
    }
  }
    
  reset() {
    if (this.y > height) {
      // this.x = random(50, 450)
      this.x = random(clouds.map((cloud) => {
        let result = cloud.x += cloud.speed
        return result 
      }))
      this.y = random(clouds.map((cloud) => {
        let result = cloud.y
        return result
      }))
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

class Dirt {
  constructor() {
    this.x = 0
    this.y = 480
    this.height = 20
    this.width = width
  }
  
  show() {
    noStroke()
    if (raining) {
      fill('rgb(70,46,34)')
    } else {
      fill('rgb(146,104,41)')
    }
    rect(this.x, this.y, this.width, this.height)
  }
}

class Display {
  constructor() {
    this.title = ""
    this.info = true
  }
  
  show() {
    if (raining) {
      this.title = "It's raining!"
      this.background = background(0, 0, 80)
    } else if (!raining) {
      this.title = "Use the arrow keys\nto cut the grass!"
      this.background = background(200, 19, 100)
    }
  }
  
  clear() {
    this.info = false
    this.title = ""
    console.log("clear")
  }
}

class Grass {
  constructor() {
    this.x = random(width)
    this.y = 500
    this.width = 8
    this.height = 0
//     triangle coordinates to sit atop rectangle
    this.tri1x = this.x
    this.tri1y = this.y
    this.tri2x = this.x + this.width
    this.tri2y = this.y
    this.tri3x = this.x 
    this.tri3y = this.y - this.width*2
    
  }
  
  show() {
    noStroke() 
    fill(131, 79, 80)
    rect(this.x, this.y, this.width, this.height)
    triangle(this.tri1x, this.tri1y, this.tri2x, this.tri2y, this.tri3x, this.tri3y)
  }
  
  grow(dropSize) {
    if (this.height < 300) {
      let growSpeed = dropSize/20
      this.y -= growSpeed
      this.height += growSpeed
      this.tri1y -= growSpeed
      this.tri2y -= growSpeed
      this.tri3y -= growSpeed
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
  
  reset() {
    this.x = 0
    this.y = 0
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
  
  cut(blade) {
    blade.y = lawnMower.y + lawnMower.height - 10
    blade.height = height - blade.y
    blade.tri1y = blade.y
    blade.tri2y = blade.y
    blade.tri3y = blade.y - blade.width
  }
  
  shavings() {
    noStroke()
    fill(0, 0, 95)
    rect(this.x-5, this.y-5, 3, 8)
    console.log('shave')
  }
}