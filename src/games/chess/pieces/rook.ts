import Piece    = require('./piece');
import Position = require('../../position');

class Rook extends Piece {
  static name = 'Rook';
  static canJumpOver = false;
  
  validateMove(position: Position) {    
    var posDiff = this.getPositionDiff(position);
    
    return !!((posDiff.x == 0 && posDiff.y != 0) || 
      (posDiff.x != 0 && posDiff.y == 0));
  }
}

export = Rook;
