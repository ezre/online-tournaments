/// <reference path="../../../typings/tsd.d.ts"/>

import Game = require('../game');
import Board = require('./board');

class Chess extends Game {
  board: Board;
  
  constructor() {
    super();
    this.board = new Board(this);
  }
}

export = Chess;
