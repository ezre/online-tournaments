import Piece    = require('./piece');
import Position = require('../../position');

class Pawn extends Piece {
  static name         = 'Pawn';
  static canJumpOver  = false;
  direction: number;
  isTwoRanksForward: boolean;
  
  constructor(position: Position) {
    super(position);
    this.isTwoRanksForward = false;
  }
  
  set position(position: Position) {
    var posDiff = this.getPositionDiff(position);
    
    if (this.board.isInRange(position) && this.validateMove(position)) {
      if (posDiff.y === 2 && !this.isTwoRanksForward) {
        this.isTwoRanksForward = true;
      } else if (this.isTwoRanksForward) {
        this.isTwoRanksForward = false;
      }
      this._position = position;
    }
  }
  
  validateMove(position: Position) {
    var posDiff   = this.getPositionDiff(position);
    var maxYdiff  = this.direction * (this.hasMoved ? 1 : 2); 
    
    return !!(posDiff.x == 0 && posDiff.y != 0 && posDiff.y <= maxYdiff); 
  }
  
  validateCapture(position: Position) {
    var posDiff   = this.getPositionDiff(position);
    var maxYdiff  = this.direction * 1;
    
    return !!(Math.abs(posDiff.x) == 1 && posDiff.y == maxYdiff);
  }
}

export = Pawn;
