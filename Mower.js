/*  global
    mowerRight, image, mowerLeft, height, noStroke, fill, rect, dirt
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
    blade.y = this.y + this.height - 5
    blade.height = height - blade.y - dirt.height
    blade.tri1y = blade.y
    blade.tri2y = blade.y
    blade.tri3y = blade.y - blade.width
  }
}