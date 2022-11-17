export function matrix(input) {
  let matrix = new Array(input.length);
  for (let i = 0; i < input.length; i++) {
    let inner = [];
    for (let j = 0; j < input[i].length; j++) inner.push(input[i][j]);
    matrix[i] = inner;
  }
  return matrix;
}

export function compareMatrices(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}

export function multiplyMatrices(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    let inner = [];
    for (let j = 0; j < a[i].length; j++) {
      inner.push(
        a[i][0] * b[0][j] +
          a[i][1] * b[1][j] +
          a[i][2] * b[2][j] +
          a[i][3] * b[3][j]
      );
    }
    result.push(inner);
  }
  return result;
}

export function matrixMultipliedByTuple(matrix, tuple) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(
      matrix[i][0] * tuple[0] +
        matrix[i][1] * tuple[1] +
        matrix[i][2] * tuple[2] +
        matrix[i][3] * tuple[3]
    );
  }
  return result;
}

export function identityMatrix() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
}

export function transposingMatrix(matrix) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    let inner = [];
    for (let j = 0; j < matrix[i].length; j++) {
      inner.push(matrix[j][i]);
    }
    result.push(inner);
  }
  return result;
}

export function determinant(matrix) {
  let result = 0;
  if (matrix.length == 2) {
    result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  } else {
    for (let i = 0; i < matrix.length; i++) {
      result += matrix[0][i] * cofactor(matrix, 0, i);
    }
  }
  return result;
}

export function subMatrix(matrix, row, column) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i != row) {
      let inner = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j != column) inner.push(matrix[i][j]);
      }
      result.push(inner);
    }
  }
  return result;
}

export function minor(matrix, row, column) {
  const sub = subMatrix(matrix, row, column);
  return determinant(sub);
}

export function cofactor(matrix, row, column) {
  let compare = minor(matrix, row, column);

  if ((row + column) % 2 === 0) return compare;
  else return -compare;
}

export function isInvertible(matrix) {
  return determinant(matrix) != 0 ? true : false;
}

export function inverse(matrix) {
  if (!isInvertible(matrix)) {
    console.log(`Matrix: ${matrix} is not invertible`);
  } else {
    let result = emptyMatrix(matrix.length);
    let det = determinant(matrix);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        let item = cofactor(matrix, i, j);
        result[j][i] = item / det;
      }
    }
    return result;
  }
}

export function emptyMatrix(size) {
  let matrix = new Array();
  for (let i = 0; i < size; i++) {
    matrix.push([]);
  }
  return matrix;
}
