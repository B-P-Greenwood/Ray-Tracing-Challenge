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
