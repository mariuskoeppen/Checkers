class Piece {
  constructor(white) {
    this.white = white

    this.x = 0
    this.y = 0
    this.radius = TILE_SIZE / 1.7

    this.promoted = false
  }

  show() {
    const { x , y, radius, white, promoted } = this
    noStroke()
    let col = white ? COLORS.white : COLORS.black
    fill(col)
    circle(x, y, radius)

    if(promoted) {
      // fill(white ? COLORS.black : COLORS.white)
      // noStroke()
      // circle(x, y, radius / 4)
      // fill(COLORS.promoted)
      // circle(x, y, 5)
      // fill(white ? COLORS.black : COLORS.white)
      noFill()
      stroke(white ? COLORS.black : COLORS.white)
      strokeWeight(2)
      push()
      translate(x, y)
      beginShape()
      vertex(-6, 7)
      vertex(-12, -7)
      vertex(-5, -3)
      vertex(0, -10)
      vertex(+5, -3)
      vertex(+12, -7)
      vertex(+6, 7)
      endShape(CLOSE)
      point(0, 0)
      line(-5, 11, 5, 11)
      pop()
    }
  }

  moveTo(x, y) {
    this.x = x
    this.y = y
  }
}
