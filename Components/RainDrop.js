/*  global
    noStroke, fill, ellipse, triangle, blades, collideRectCircle, lawnMower
*/

class RainDrop {
  constructor (x, y, d) {
    this.x = x
    this.y = y
    this.diameter = d / 3
    this.fallSpeed = 1 * this.diameter
    this.triX1 = this.x - this.diameter / 2
    this.triY1 = this.y
    this.triX2 = this.x + this.diameter / 2
    this.triY2 = this.y
    this.triX3 = this.x
    this.triY3 = this.y - this.diameter
    this.initialy = y
  }

  show () {
    noStroke()
    fill(179, 79, 80)
    ellipse(this.x, this.y, this.diameter) && triangle(this.triX1, this.triY1, this.triX2, this.triY2, this.triX3, this.triY3)
  }

  drip () {
    this.y += this.fallSpeed
    this.triY1 += this.fallSpeed
    this.triY2 += this.fallSpeed
    this.triY3 += this.fallSpeed

    for (const blade of blades) {
      const hit = collideRectCircle(blade.x, blade.y, blade.width, blade.height, this.x, this.y, this.diameter)
      if (hit) {
        blade.grow(this.diameter)
      }
    }
  }

  rain () {
    function maxHeight (blade) {
      return blade.height > 300
    }

    if (blades.every(maxHeight)) {
      raining = false
      lawnMower.reset()
    } else {
      this.drip()
    }
  }
}
