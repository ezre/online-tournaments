import Board    = require('../board');
import Position = require('../../position');
import Player   = require('../../player');

class Piece {
  name: string;
  isAlive: boolean;
  board: Board;
  player: Player;
  private _position: Position;
  
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
}

export = Piece;
