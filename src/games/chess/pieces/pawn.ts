import Piece    = require('./piece');
import Position = require('../../position');

class Pawn extends Piece {
  static name         = 'Pawn';
  static canJumpOver  = false;
  
  direction: number;
  
  constructor(position: Position) {
    super(position);
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
