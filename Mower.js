/*  global
    mowerRight, image, mowerLeft, height, noStroke, fill, rect
*/

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
    if (blade.y > this.y + this.height - 10) {
      blade.y = this.y + this.height - 10
      blade.height = height - blade.y
      blade.tri1y = blade.y
      blade.tri2y = blade.y
      blade.tri3y = blade.y - blade.width
    }
  }
  
  shavings() {
    noStroke()
    fill(0, 0, 95)
    rect(this.x-5, this.y-5, 3, 8)
  }
}