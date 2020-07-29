/*  global
    random, width, noStroke, fill, ellipse
*/

class Cloud {
  constructor () {
    this.x = random(0, width)
    this.y = random(30, 200)
    this.diameter = random(10, 50)
    this.speed = this.diameter * 0.02
    this.cloudParticles = [
      {
        x: this.x,
        y: this.y,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 8 * 5,
        y: this.y + this.diameter / 4,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 4 * 5,
        y: this.y + this.diameter / 2,
        d: this.diameter
      },
      {
        x: this.x - this.diameter / 8 * 5,
        y: this.y + this.diameter / 4,
        d: this.diameter
      },
      {
        x: this.x - this.diameter / 4 * 5,
        y: this.y + this.diameter / 2,
        d: this.diameter
      },
      {
        x: this.x - this.diameter / 8 * 5,
        y: this.y + this.diameter / 4 * 3,
        d: this.diameter
      },
      {
        x: this.x + this.diameter / 8 * 5,
        y: this.y + this.diameter / 4 * 3,
        d: this.diameter
      },
      {
        x: this.x,
        y: this.y + this.diameter
      },
      {
        x: this.x,
        y: this.y + this.diameter / 2
      }
    ]
  }

  show () {
    noStroke()
    fill(0, 0, 40)
    for (const cloudParticle of this.cloudParticles) {
      ellipse(cloudParticle.x, cloudParticle.y, this.diameter)
    }
  }

  reset () {
    this.x = 0 - this.diameter / 4 * 5 - this.diameter
    this.cloudParticles[0].x = this.x
    this.cloudParticles[1].x = this.x + this.diameter / 8 * 5
    this.cloudParticles[2].x = this.x + this.diameter / 4 * 5
    this.cloudParticles[3].x = this.x - this.diameter / 8 * 5
    this.cloudParticles[4].x = this.x - this.diameter / 4 * 5
    this.cloudParticles[5].x = this.x - this.diameter / 8 * 5
    this.cloudParticles[6].x = this.x + this.diameter / 8 * 5
    this.cloudParticles[7].x = this.x
    this.cloudParticles[8].x = this.x
  }

  move () {
    if (this.x - this.diameter / 4 * 5 - this.diameter < width) {
      this.x += this.speed
      for (const cloudParticle of this.cloudParticles) {
        cloudParticle.x += this.speed
      }
    } else {
      this.reset()
    }
  }
}

