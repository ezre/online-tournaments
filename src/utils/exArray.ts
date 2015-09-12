class ExArray {
  private _elements: any[];
  
  add(element: any) {
    if (-1 === this._elements.indexOf(element)) {
      this._elements.push(element);
    }
  }
  
  remove(element: any) {
    var idx = this._elements.indexOf(element);
    if (-1 !== idx) {
      this._elements.splice(idx, 1);
    }
  }
  
  removeIndex(idx: number) {
    if (typeof this._elements[idx] !== 'undefined') {
      this._elements.splice(idx, 1);
    }
  }
  
  set(idx: number, element: any) {
    this._elements[idx] = element;
  }
  
  toArray() {
    return this._elements;
  }
  
  get(idx: number) {
    return typeof this._elements[idx] !== 'undefined' ? this._elements[idx] : null;
  }
  
  first() {
    return typeof this._elements[0] !== 'undefined' ? this._elements[0] : null;
  }
  
  last() {
    var lastElem = null;
    if (this._elements.length > 0) {
      lastElem = this._elements.length - 1;
    }
    return lastElem;
  }
  
  indexOf(element: any) {
    return this._elements.indexOf(element);
  }
  
  has(element: any) {
    return -1 !== this._elements.indexOf(element);
  }
  
  hasIndex(idx: number) {
    return typeof this._elements[idx] !== 'undefined';
  }
  
  isEmpty() {
    return 0 === this._elements.length;
  }
  
  clear() {
    this._elements = [];
  }
  
  length() {
    return this._elements.length;
  }
}

export = ExArray;
