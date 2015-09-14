import Board        = require('../board');
import Position     = require('../../position');
import ChessPlayer  = require('../chessPlayer');

class Piece {
  static name: string;
  static canJumpOver: boolean;
  hasMoved: boolean;
  isAlive: boolean;
  board: Board;
  player: ChessPlayer;
  protected _position: Position;
  
  constructor(position: Position) {
    this._position  = position;
    this.isAlive    = true;
    this.hasMoved   = false;
  }
  
  set position(position: Position) {
    if(this.board.isInRange(position) && this.validateMove(position)) {
      this._position = position;
    }
  }
  
  get position() {
    return this._position;
  }
  
  validateMove(position: Position) {
    return false;
  }
  
  validateCapture(position: Position) {
    return this.validateMove(position);
  }
  
  getPositionDiff(position: Position) {
    return {
      x: position.x - this._position.x,
      y: position.y - this._position.y
    }
  }
}

export = Piece;
