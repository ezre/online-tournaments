import Player = require('../player');
import ExArray = require('../../utils/exArray');
import Piece = require('./pieces/piece');
import Direction = require('./direction');


class ChessPlayer extends Player {
  private _pieces: ExArray;
  direction: Direction;
  time: number;
  isReady: boolean;
  
  constructor() {
    super();
    
    this._pieces    = new ExArray();
    this.direction  = null;
    this.time       = 0;
    this.isReady    = false;
  }
  
  addPiece(piece: Piece) {
    this._pieces.add(piece);
    
    return this;
  }
  
  removePiece(piece: Piece) {
    this._pieces.remove(piece);
  }
  
  getPieces() {
    return this._pieces.toArray();
  }
}

export = ChessPlayer;