class Game {
  private _id: number;
  private _createdAt: Date;
  
  get id(): number {
    return this._id;
  }
  
  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }
  
  get createdAt(): Date {
    return this._createdAt;
  }
}

export = Game;
