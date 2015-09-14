import Game     = require('../game');
import Piece    = require('pieces/piece');
import Position = require('../position');
import Pawn     = require('pieces/pawn');
import Knight   = require('pieces/knight');
import Bishop   = require('pieces/bishop');
import King     = require('pieces/king');
import Queen    = require('pieces/queen');
import Rook     = require('pieces/rook');
import ExArray  = require('../../utils/exArray');

enum ActionType {
  Move,
  Capture
};

class Board {
  static size = { x: 8, y: 8 };
  private _pieces: ExArray;
  squareArray: Piece[][];
  game: Game;
  
  constructor(game: Game) {
    this._pieces = new ExArray();
    
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
    
    this.addPiece(piece);
  }
  
  addPiece(piece: Piece) {
    this._pieces.add(piece);
    this.squareArray[piece.position.x][piece.position.y] = piece;

    return this;
  }
  
  removePiece(piece: Piece) {
    this.squareArray[piece.position.x][piece.position.y] = null;
    piece.player.removePiece(piece);
    piece.player = null;
  }
  
  movePiece(piece: Piece, position: Position) {
    var result = false;
    if (this.isInRange(position)) {
      piece.position = position;
      result = true;
      if (!piece.hasMoved) {
        piece.hasMoved = true;
      }
    }
    
    return result;
  }
  
  isInRange(position: Position) {
    return position.x > 0 && 
      position.x < Board.size.x &&
      position.y > 0 &&
      position.y < Board.size.y;
  }
  
  getPieceByPosition(position: Position) {
    var piece = null
    
    if(typeof this.squareArray[position.x][position.y] !== 'undefined' &&
    this.squareArray[position.x][position.y] !== null) {
      piece = this.squareArray[position.x][position.y]; 
    }
    
    return piece;
  }
  
  areFieldsEmpty(positionFrom: Position, positionTo: Position) {
    var startX, startY, endX, endY, areEmpty = true;
    
    startX  = Math.min(positionFrom.x, positionTo.x);
    endX    = Math.max(positionFrom.x, positionTo.x);
    startY  = Math.min(positionFrom.y, positionTo.y);
    endY    = Math.max(positionFrom.y, positionTo.y);
    
    for (var y = startY; y <= endY; y++) {
      for (var x = startX; x <= endX; x++) {
        if (typeof this.squareArray[x][y] !== 'undefined' &&
        this.squareArray[x][y] !== null) {
          areEmpty = false;
          break;
        }
      }
      if (areEmpty === false) {
        break;
      }
    }
    
    return areEmpty;
  }
}

export = Board;
