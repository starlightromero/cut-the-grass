/*  global
    noStroke, fill, ellipse, width
*/

class Sun {
  constructor() {
    this.x = width / 10 * 9
    this.y = 70
    this.diameter = 100
  }
  
  show() {
    noStroke()
    fill(60, 70, 100)
    ellipse(this.x, this.y, this.diameter)  
  }
}