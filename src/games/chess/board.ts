import Piece = require('pieces/piece');
import Position = require('../position');

class Board {
  static size = { x: 8, y: 8 };
  private _pieces: Piece[];
  
  constructor() {
    for (var index = 0; index < 8; index++) {
      // this.addPiece(new )
    }
  }
  
  addPiece(piece: Piece) {
    this._pieces.push(piece);
    
    return this;
  }
  
  removePiece(piece: Piece) {
    var idx = this._pieces.indexOf(piece);
    
    if(idx > -1) {
      this._pieces.slice(idx, 1);
    }
  }
  
  isInRange(position: Position) {
    return position.x > 0 && 
      position.x < Board.size.x &&
      position.y > 0 &&
      position.y < Board.size.y;
    
  }
}

export = Board;
