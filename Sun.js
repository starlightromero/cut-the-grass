/*  global
    noStroke, fill, ellipse
*/

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