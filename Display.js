/*  global
    raining, background
*/

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
  }
}

