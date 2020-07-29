/*  global
    width, noStroke, raining, fill, rect, height
*/

class Dirt {
  constructor () {
    this.height = 60
    this.width = width
    this.x = 0
    this.y = height - this.height
  }

  show () {
    noStroke()
    if (raining) {
      fill('rgb(70,46,34)')
    } else {
      fill('rgb(146,104,41)')
    }
    rect(this.x, this.y, this.width, this.height)
  }
}
