/*  global
    HSB, colorMode, createCanvas, height, LEFT_ARROW, RIGHT_ARROW, UP_ARROW
    random, text, textSize, width, collideRectRect, keyCode, RainDrop, Cloud
    loadImage, loadFont, textAlign, CENTER, textFont, windowWidth, windowHeight
    Display, Grass, Dirt, Mower, Sun, DOWN_ARROW
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

function preload () {
  mowerLeft = loadImage('assets/mower-left.png')
  mowerRight = loadImage('assets/mower-right.png')
  titleFont = loadFont('assets/Typo_Round.otf')
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 100, 100)

  for (let i = 0; i < 6; i++) {
    clouds[i] = new Cloud()
  }

  for (let i = 0; i < 20; i++) {
    for (const cloud of clouds) {
      const chosenResult = random(cloud.cloudParticles)
      drops.push(new RainDrop(chosenResult.x, chosenResult.y, chosenResult.d))
    }
  }

  dirt = new Dirt()

  for (let i = 0; i < 100; i++) {
    blades[i] = new Grass()
  }

  lawnMower = new Mower()
  sun = new Sun()

  raining = true

  textFont(titleFont)
  textSize(width / 15)
  textAlign(CENTER, CENTER)

  display = new Display()
}

function draw () {
  display.show()
  display.background

  if (raining) {
    if (drops.length < clouds.length * 40) {
      for (const cloud of clouds) {
        const chosenResult = random(cloud.cloudParticles)
        drops.push(new RainDrop(chosenResult.x, chosenResult.y, chosenResult.d))
      }
    }
    drops = drops.filter(drop => drop.y < height)
    for (const drop of drops) {
      drop.show()
      drop.rain()
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
    text(display.title.toUpperCase(), width / 2, height / 2)
  }
  setTimeout(display.clear, 3000)
}

function keyPressed () {
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
    const cutGrass = collideRectRect(lawnMower.x, lawnMower.y, lawnMower.width, lawnMower.height, blade.x, blade.y, blade.width, blade.height)
    if (cutGrass && blade.height > 0) {
      lawnMower.cut(blade)
    }

    const allCut = blade => {
      return blade.height <= 0
    }

    if (blades.every(allCut)) {
      raining = true
    }
  }
}
