import Piece    = require('./piece');
import Position = require('../../position');

class Bishop extends Piece {
  static name = 'Bishop';
  static canJumpOver = false;
  
  validateMove(position: Position) {    
    var posDiff = this.getPositionDiff(position);
    
    return !!((posDiff.x != 0 || posDiff.y != 0) &&
      Math.abs(posDiff.x) == Math.abs(posDiff.y));
  }
}

export = Bishop;
