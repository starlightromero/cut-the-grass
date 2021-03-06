/*  global
    random, width, noStroke, fill, rect, triangle, height, dirt
*/

class Grass {
  constructor () {
    this.x = random(width)
    this.y = height - dirt.height
    this.width = 6
    this.height = 0
    this.tri1x = this.x
    this.tri1y = this.y
    this.tri2x = this.x + this.width
    this.tri2y = this.y
    this.tri3x = this.x
    this.tri3y = this.y - this.width * 2
  }

  show () {
    noStroke()
    fill(131, 79, 80)
    rect(this.x, this.y, this.width, this.height)
    triangle(this.tri1x, this.tri1y, this.tri2x, this.tri2y, this.tri3x, this.tri3y)
  }

  grow (dropSize) {
    if (this.height < 300) {
      const growSpeed = dropSize / 20
      this.y -= growSpeed
      this.height += growSpeed
      this.tri1y -= growSpeed
      this.tri2y -= growSpeed
      this.tri3y -= growSpeed
    }
  }
}
