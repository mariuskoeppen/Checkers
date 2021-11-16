class Tile {
  constructor(i, j) {
    this.i = i
    this.j = j

    const { x, y } = coordinatesFromIndeces(i, j)
    this.x = x
    this.y = y

    this.name = squareName(i*4+j)

    this.piece = null

    this.highlighted = false
    this.selected = false
    this.legalMover = false
    this.legalTarget = false
    this.lastJump = false
  }

  show() {
    const { x, y, piece, highlighted, selected, legalMover, legalTarget, lastJump } = this

    let col = selected ? COLORS.selected : (highlighted ? COLORS.highlighted : COLORS.blackSquare)
    fill(col)
    noStroke()
    rect(x, y, TILE_SIZE, TILE_SIZE)

    if(legalMover & !selected) {
      noFill()
      stroke(COLORS.legalMover)
      strokeWeight(6)
      rect(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6)
    } else if(legalTarget & !selected) {
      noFill()
      stroke(COLORS.legalTarget)
      strokeWeight(6)
      rect(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6)
    } else if(lastJump & !selected) {
      noFill()
      stroke(COLORS.lastJump)
      strokeWeight(6)
      rect(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6)
    }

    if(piece) {
      piece.show()
    }
  }

  addPiece(p) {
    this.piece = p
    this.piece.moveTo(this.x + TILE_SIZE / 2, this.y + TILE_SIZE / 2)
  }

  removePiece() {
    this.piece = null
  }

  select() {
    this.selected = true
  }

  unselect() {
    this.selected = false
  }
}
