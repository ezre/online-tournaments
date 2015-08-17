import Game     = require('../game');
import Piece    = require('pieces/piece');
import Position = require('../position');
import Pawn     = require('pieces/pawn');
import Knight   = require('pieces/knight');
import Bishop   = require('pieces/bishop');
import King     = require('pieces/king');
import Queen    = require('pieces/queen');
import Rook     = require('pieces/rook');

class Board {
  static size = { x: 8, y: 8 };
  private _pieces: Piece[];
  game: Game;
  
  constructor(game: Game) {
    for (var player = 0; player <= 1; player++) {
      for (var row = player ? 6 : 0, maxRow = row + 1; row <= maxRow; row ++) {
        for (var column = 0; column < 8; column++) {
          this.addPieceByPosition({ x: column, y: row });
        }
      }
    }
  }
  
  addPieceByPosition(position: Position) {
    var piece = null;
    
    if (!this.isInRange(position)) {
      return false;
    }
    
    if (position.y == 1 || position.y == 6) { 
      piece = new Pawn(position);
    } else {
      if (position.x % 7 == 0) {
        piece = new Rook(position);
      } else if (position.x % 5 == 1) {
        piece = new Knight(position);
      } else if (position.x % 3 == 2) {
        piece = new Bishop(position);
      } else if (position.x == 3) {
        piece = new King(position);
      } else {
        piece = new Queen(position);
      }
    }
    
    
  }
  
  addPiece(piece: Piece) {
    this._pieces.push(piece);
    
    return this;
  }
  
  removePiece(piece: Piece) {
    var idx = this._pieces.indexOf(piece);
    
    if (idx > -1) {
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
