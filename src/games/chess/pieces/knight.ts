import Piece    = require('./piece');
import Position = require('../../position');

class Knight extends Piece {
  static name = 'Knight';
  
  validateMove(position: Position) {    
    var posDiff = this.getPositionDiff(position);
    
    return !!((Math.abs(posDiff.x) == 1 && Math.abs(posDiff.y) == 2) ||
      (Math.abs(posDiff.x) == 2 && Math.abs(posDiff.y) == 1));
  }
}
