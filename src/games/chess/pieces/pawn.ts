import Piece    = require('./piece');
import Position = require('../../position');

class Pawn extends Piece {
  static name = 'Pawn';
  hasMoved: boolean;
  
  constructor(position: Position) {
    super(position);
    this.hasMoved = false;
  }
  
  validateMove(position: Position) {
    var posDiff = this.getPositionDiff(position);
    var maxYdiff = this.hasMoved ? 1 : 2; 
    
    return !!(posDiff.x == 0 && posDiff.y != 0 && posDiff.y <= maxYdiff); 
  }
}