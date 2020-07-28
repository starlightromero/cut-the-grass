/*  global
    width, noStroke, raining, fill, rect
*/

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