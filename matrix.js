export class Matrix extends Array {
  static get [Symbol.species]() {
    return this;
  }

  compareMatrices(matrix) {
    if (this.length !== matrix.length) return false;

    for (let i = 0; i < this.length; i++) {
      if (this[i].length !== matrix[i].length) return false;
      for (let j = 0; j < this[i].length; j++) {
        if (this[i][j] !== matrix[i][j]) return false;
      }
    }
    return true;
  }

  multiplyMatrices(matrix) {
    let result = new Matrix();
    for (let i = 0; i < this.length; i++) {
      let inner = [];
      for (let j = 0; j < this[i].length; j++) {
        inner.push(
          this[i][0] * matrix[0][j] +
            this[i][1] * matrix[1][j] +
            this[i][2] * matrix[2][j] +
            this[i][3] * matrix[3][j]
        );
      }
      result.push(inner);
    }
    return result;
  }

  matrixMultipliedByTuple(tuple) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(
        this[i][0] * tuple[0] +
          this[i][1] * tuple[1] +
          this[i][2] * tuple[2] +
          this[i][3] * tuple[3]
      );
    }
    return result;
  }

  identityMatrix() {
    return new Matrix([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
  }

  transposingMatrix() {
    let result = new Matrix();
    for (let i = 0; i < this.length; i++) {
      let inner = [];
      for (let j = 0; j < this[i].length; j++) {
        inner.push(this[j][i]);
      }
      result.push(inner);
    }
    return result;
  }

  determinant() {
    let result = 0;
    if (this.length == 2) {
      result = this[0][0] * this[1][1] - this[0][1] * this[1][0];
    } else {
      for (let i = 0; i < this.length; i++) {
        result += this[0][i] * this.cofactor(0, i);
      }
    }
    return result;
  }

  subMatrix(row, column) {
    let result = new Matrix();
    for (let i = 0; i < this.length; i++) {
      if (i != row) {
        let inner = [];
        for (let j = 0; j < this[i].length; j++) {
          if (j != column) inner.push(this[i][j]);
        }
        result.push(inner);
      }
    }
    return result;
  }

  minor(row, column) {
    return this.subMatrix(row, column).determinant();
  }

  cofactor(row, column) {
    let compare = this.minor(row, column);

    if ((row + column) % 2 === 0) return compare;
    else return -compare;
  }

  isInvertible() {
    return this.determinant() != 0 ? true : false;
  }

  inverse() {
    if (!this.isInvertible()) {
      console.log(`Matrix: ${this} is not invertible`);
    } else {
      let result = emptyMatrix(this.length);
      let det = this.determinant(this);
      for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < this.length; j++) {
          let item = this.cofactor(i, j);
          result[j][i] = item / det;
        }
      }
      return result;
    }
  }
}

function emptyMatrix(size) {
  let matrix = new Matrix();
  for (let i = 0; i < size; i++) {
    matrix.push([]);
  }
  return matrix;
}
