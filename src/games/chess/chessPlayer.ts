import Player = require('../player');
import ExArray = require('../../utils/exArray');
import Piece = require('./pieces/piece');

class ChessPlayer extends Player {
  private _pieces: ExArray;
  
  constructor() {
    super();
    
    this._pieces = new ExArray();
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