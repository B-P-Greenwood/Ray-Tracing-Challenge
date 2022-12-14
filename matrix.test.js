import { describe, expect, test } from '@jest/globals';
import { Matrix } from './matrix.js';
import { point, Tuple, vector } from './index.js';

describe('Constructing and inspecting a 4x4 matrix \n| 1 | 2 | 3 | 4 |\n| 5.5 | 6.5 | 7.5 | 8.5 |\n| 9 | 10 | 11 | 12 |\n| 13.5 | 14.5 | 15.5 | 16.5 |', function () {
  const M = new Matrix(
    [1, 2, 3, 4],
    [5.5, 6.5, 7.5, 8.5],
    [9, 10, 11, 12],
    [13.5, 14.5, 15.5, 16.5]
  );

  test('M[0,0] = 1', function () {
    const outcome = 1;
    const actual = M[0][0];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[0,3] = 4', function () {
    const outcome = 4;
    const actual = M[0][3];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[1,0] = 5.5', function () {
    const outcome = 5.5;
    const actual = M[1][0];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[1,2] = 7.5', function () {
    const outcome = 7.5;
    const actual = M[1][2];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[2,2] = 11', function () {
    const outcome = 11;
    const actual = M[2][2];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[3,0] = 13.5', function () {
    const outcome = 13.5;
    const actual = M[3][0];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[3,2] = 15.5', function () {
    const outcome = 15.5;
    const actual = M[3][2];
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Constructing and inspecting a 3x3 matrix \n| -3 | 5 | 0 |\n| 1 | -2 | -7 |\n| 0 | 1 | 1 |', function () {
  const M = new Matrix([-3, 5, 0], [1, -2, -7], [0, 1, 1]);

  test('M[0,0] = -3', function () {
    const outcome = -3;
    const actual = M[0][0];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[1,1] = -2', function () {
    const outcome = -2;
    const actual = M[1][1];
    expect(actual).toStrictEqual(outcome);
  });
  test('M[2,2] = 1', function () {
    const outcome = 1;
    const actual = M[2][2];
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Matrix equality with identical matrices. A and B= \n| -3 | 5 | 0 |\n| 1 | -2 | -7 |\n| 0 | 1 | 1 |', function () {
  const A = new Matrix([-3, 5, 0], [1, -2, -7], [0, 1, 1]);
  const B = new Matrix([-3, 5, 0], [1, -2, -7], [0, 1, 1]);
  test('A === B', function () {
    const outcome = true;
    const actual = A.compareMatrices(B);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Matrix equality with un-identical matrices. A = \n| -3 | 5 | 0 |\n| 1 | -2 | -7 |\n| 0 | 1 | 1 | B = \n| -1 | 5 | 0 |\n| 1 | -2 | -8 |\n| 0 | 1 | 2 |', function () {
  const A = new Matrix([
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1],
  ]);
  const B = new Matrix([
    [-1, 5, 0],
    [1, -2, -8],
    [0, 1, 2],
  ]);
  test('A !== B', function () {
    const outcome = true;
    const actual = A.compareMatrices(B);
    expect(actual).not.toStrictEqual(outcome);
  });
});
describe('Multiply two 4x4 matrices A= \n| 1 | 2 | 3 | 4 |\n| 5 | 6 | 7 | 8 |\n| 9 | 8 | 7 | 6 |\n| 5 | 4 | 3 | 2 | B= \n| -2 | 1 | 2 | 3 |\n| 3 | 2 | 1 | -1 |\n| 4 | 3 | 6 | 5 |\n| 1 | 2 | 7 | 8 |', function () {
  const A = new Matrix([1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]);
  const B = new Matrix(
    [-2, 1, 2, 3],
    [3, 2, 1, -1],
    [4, 3, 6, 5],
    [1, 2, 7, 8]
  );
  test('A * B = | 20 | 22 | 50 | 48 |\n| 44 | 54 | 114 | 108 |\n| 40 | 58 | 110 | 102 |\n| 16 | 26 | 46 | 42 |', function () {
    const actual = A.multiplyMatrices(B);
    const outcome = new Matrix(
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]
    );
    expect(actual).toStrictEqual(outcome);
  });
});

describe('A matrix A= | 1 | 2 | 3 | 4 |\n| 2 | 4 | 4 | 2 |\n| 8 | 6 | 4 | 1 |\n| 0 | 0 | 0 | 1 | multiplied by a tuple (1,2,3,1). ', function () {
  const A = new Matrix([1, 2, 3, 4], [2, 4, 4, 2], [8, 6, 4, 1], [0, 0, 0, 1]);
  const T = new Tuple(1, 2, 3, 1);
  test('A*B = tuple(18,24,33,1)', function () {
    const actual = A.matrixMultipliedByTuple(T);
    const outcome = new Tuple(18, 24, 33, 1);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Multiplying a matrix by the identity matrix. Matrix A= | 1 | 2 | 3 | 4 |\n| 2 | 4 | 4 | 2 |\n| 8 | 6 | 4 | 1 |\n| 0 | 0 | 0 | 1 |', function () {
  const A = new Matrix([1, 2, 3, 4], [2, 4, 4, 2], [8, 6, 4, 1], [0, 0, 0, 1]);
  test('A*identity Matrix = 1', function () {
    const actual = A.multiplyMatrices(A.identityMatrix());
    expect(actual).toEqual(A);
  });
});

describe('Multiplying a tuple by the identity matrix', function () {
  test('Tuple A=(1,2,3,4) * identity matrix = A', function () {
    const T = new Tuple(1, 2, 3, 4);
    const A = new Matrix().identityMatrix();
    const identity = new Matrix(...A);
    const actual = identity.matrixMultipliedByTuple(T);
    expect(actual).toStrictEqual(T);
  });
});

describe('Transposing a matrix, matrix=| 0 | 9 | 3 | 0 |\n| 9 | 8 | 0 | 8 |\n| 1 | 8 | 5 | 3 |\n| 0 | 0 | 5 | 8 |', function () {
  const matrix = new Matrix(
    [0, 9, 3, 0],
    [9, 8, 0, 8],
    [1, 8, 5, 3],
    [0, 0, 5, 8]
  );
  test('matrix transposed | 0 | 9 | 1 | 0 |\n| 9 | 8 | 8 | 0 |\n| 3 | 0 | 5 | 5 |\n| 0 | 8 | 3 | 8 |', function () {
    const outcome = new Matrix(
      [0, 9, 1, 0],
      [9, 8, 8, 0],
      [3, 0, 5, 5],
      [0, 8, 3, 8]
    );
    const actual = matrix.transposingMatrix();
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Transposing the identity matrix returns the identity matrix', function () {
  test('transposingMatrix(identityMatrix()) = identityMatrix', function () {
    const A = new Matrix().identityMatrix();
    const identity = new Matrix(...A);
    const actual = identity.transposingMatrix();
    expect(actual).toStrictEqual(A);
  });
});
describe('Calculating the determinant of a 2x2 matrix | 1 | 5 |\n| -3 | 2 |', function () {
  const matrix = new Matrix([1, 5], [-3, 2]);
  test('determinant(A) = 17', function () {
    const actual = matrix.determinant();
    const outcome = 17;
    expect(actual).toStrictEqual(outcome);
  });
});

describe('A submatrix of a 3x3 matrix is a 2x2 matrix', function () {
  const matrix = new Matrix([1, 5, 0], [-3, 2, 7], [0, 6, -3]);
  test('The correct submatrix has been extracted', function () {
    const actual = matrix.subMatrix(0, 2);
    const outcome = new Matrix([-3, 2], [0, 6]);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('A submatrix of a 4x4 matrix is a 3x3 matrix', function () {
  const matrix = new Matrix(
    [-6, 1, 1, 6],
    [-8, 5, 8, 6],
    [-1, 0, 8, 2],
    [-7, 1, -1, 1]
  );
  test('The correct submatrix has been extracted', function () {
    const actual = matrix.subMatrix(2, 1);
    const outcome = new Matrix([-6, 1, 6], [-8, 8, 6], [-7, -1, 1]);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Calculating the minor of a 3x3 matrix', function () {
  test('The submatrix equals the determinant of the same 3x3 matrix', function () {
    const matrix = new Matrix([3, 5, 0], [2, -1, -7], [6, -1, 5]);
    const sub = matrix.subMatrix(1, 0);
    const d = sub.determinant();
    const actual = matrix.minor(1, 0);
    expect(actual).toStrictEqual(d);
  });
});

describe('Calculating a cofactor of a 3x3 matrix', function () {
  const matrix = new Matrix([3, 5, 0], [2, -1, -7], [6, -1, 5]);
  test('Minor of the matrix position equals the cofactor', function () {
    const outcome = matrix.minor(0, 0);
    const actual = matrix.cofactor(0, 0);
    expect(actual).toStrictEqual(outcome);
  });
  test('Minor of the matrix poition does not equal the cofactor', function () {
    const outcome = matrix.minor(1, 0);
    const actual = matrix.cofactor(1, 0);
    expect(actual).toStrictEqual(-outcome);
  });
});

describe('Calculating the determinant of a 3x3 matrix', function () {
  const matrix = new Matrix([1, 2, 6], [-5, 8, -4], [2, 6, 4]);
  test('cofactor(matrix, 0,0) = 56', function () {
    const actual = matrix.cofactor(0, 0);
    const outcome = 56;
    expect(actual).toStrictEqual(outcome);
  });
  test('cofactor(matrix, 0,0) = 12', function () {
    const actual = matrix.cofactor(0, 1);
    const outcome = 12;
    expect(actual).toStrictEqual(outcome);
  });
  test('cofactor(matrix, 0,0) = -46', function () {
    const actual = matrix.cofactor(0, 2);
    const outcome = -46;
    expect(actual).toStrictEqual(outcome);
  });
  test('determinant(matrix) = -196', function () {
    const actual = matrix.determinant();
    const outcome = -196;
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Calculating the determinant of a 4x4 matrix', function () {
  const matrix = new Matrix(
    [-2, -8, 3, 5],
    [-3, 1, 7, 3],
    [1, 2, -9, 6],
    [-6, 7, 7, -9]
  );
  test('cofactor(matrix,0,0)=690', function () {
    const actual = matrix.cofactor(0, 0);
    const outcome = 690;
    expect(actual).toStrictEqual(outcome);
  });
  test('cofactor(matrix,0,1)=447', function () {
    const actual = matrix.cofactor(0, 1);
    const outcome = 447;
    expect(actual).toStrictEqual(outcome);
  });
  test('cofactor(matrix,0,2)=210', function () {
    const actual = matrix.cofactor(0, 2);
    const outcome = 210;
    expect(actual).toStrictEqual(outcome);
  });
  test('cofactor(matrix,0,3)=57', function () {
    const actual = matrix.cofactor(0, 3);
    const outcome = 51;
    expect(actual).toStrictEqual(outcome);
  });
  test('determinant(matrix) = -4071', function () {
    const actual = matrix.determinant();
    const outcome = -4071;
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Testing an invertible matrix for invertibility', function () {
  test('Is this 4x4 invertible', function () {
    const matrix = new Matrix(
      [6, 4, 4, 4],
      [5, 5, 7, 6],
      [4, -9, 3, -7],
      [9, 1, 7, -6]
    );
    const outcome = true;
    const actual = matrix.isInvertible();
    expect(actual).toStrictEqual(outcome);
  });
  test('Is this 4x4 invertible', function () {
    const matrix = new Matrix(
      [-4, 2, -2, -3],
      [9, 6, 2, 6],
      [0, -5, 1, -5],
      [0, 0, 0, 0]
    );
    const outcome = false;
    const actual = matrix.isInvertible();
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Calculating the inverse of a 4x4 matrix', function () {
  const matrix = new Matrix(
    [-5, 2, 6, -8],
    [1, -5, 1, 8],
    [7, 7, -6, -7],
    [1, -3, 7, 4]
  );
  const B = matrix.inverse();
  test('The determinant of the matrix is 532', function () {
    const actual = matrix.determinant();
    const outcome = 532;
    expect(actual).toStrictEqual(outcome);
  });
  test('The cofactor(matrix, 2,3) = -160', function () {
    const actual = matrix.cofactor(2, 3);
    const outcome = -160;
    expect(actual).toStrictEqual(outcome);
  });
  test('The inverse matrix[3,2] = -160/532', function () {
    const actual = B[3][2];
    const outcome = -160 / 532;
    expect(actual).toStrictEqual(outcome);
  });
  test('The cofactor(matrix, 3,2) = 105', function () {
    const actual = matrix.cofactor(3, 2);
    const outcome = 105;
    expect(actual).toStrictEqual(outcome);
  });
  test('The inverse matrix[2,3] = -160/532', function () {
    const actual = B[2][3];
    const outcome = 105 / 532;
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Calculating the inverse of two other matrix', function () {
  const A = new Matrix(
    [8, -5, 9, 2],
    [7, 5, 6, 1],
    [-6, 0, 9, 6],
    [-3, 0, -9, -4]
  );
  const invA = new Matrix(
    [-0.15385, -0.15385, -0.28205, -0.53846],
    [-0.07692, 0.12308, 0.02564, 0.03077],
    [0.35897, 0.35897, 0.4359, 0.92308],
    [-0.69231, -0.69231, -0.76923, -1.92308]
  );

  const B = new Matrix(
    [9, 3, 0, 9],
    [-5, -2, -6, -3],
    [-4, 9, 6, 4],
    [-7, 6, 6, 2]
  );

  const invB = new Matrix(
    [-0.04074, -0.07778, 0.14444, -0.22222],
    [-0.07778, 0.03333, 0.36667, -0.33333],
    [-0.02901, -0.1463, -0.10926, 0.12963],
    [0.17778, 0.06667, -0.26667, 0.33333]
  );
  test('Is inverse of A worked out correctly', function () {
    const actual = A.inverse();
    expect(actual[3][2]).toBeCloseTo(invA[3][2], 5);
  });
  test('Is inverse of B worked out correctly', function () {
    const actual = B.inverse();
    expect(actual[3][2]).toBeCloseTo(invB[3][2], 5);
  });
});
test('Confirm that the matrix C (matrix A * matrix B) * inverse(B) = A', function () {
  const A = new Matrix(
    [3, -9, 7, 3],
    [3, -8, 2, -9],
    [-4, 4, 4, 1],
    [-6, 5, -1, 1]
  );
  const B = new Matrix(
    [8, 2, 2, 2],
    [3, -1, 7, 0],
    [7, 0, 5, 4],
    [6, -2, 0, 5]
  );
  const C = A.multiplyMatrices(B);
  const actual = C.multiplyMatrices(B.inverse());
  expect(actual[3][2]).toBeCloseTo(A[3][2], 5);
});

describe('Multiplying by a translation matrix', function () {
  test('Given translation(5,-3,2)and point(-3,4,5) the two multiplied is point(2,1,7)', function () {
    const tran = new Matrix().translation(5, -3, 2);
    const P = point(-3, 4, 5);
    const outcome = point(2, 1, 7);
    const actual = tran.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Multiplying by the inverse of atranslation matrix', function () {
  test('Given inverse of translation(5,-3,2)and point(-3,4,5) the two multiplied is point(-8,7,3)', function () {
    const tran = new Matrix().translation(5, -3, 2);
    const P = point(-3, 4, 5);
    const inverse = tran.inverse();
    const outcome = point(-8, 7, 3);
    const actual = inverse.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Translation does not affect Vectors', function () {
  test('Given translation(5,-3,2)and vector(-3,4,5) the two multiplied is vector(-3,4,5)', function () {
    const tran = new Matrix().translation(5, -3, 2);
    const P = vector(-3, 4, 5);
    const actual = tran.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(P);
  });
});
describe('A Scaling Matrix applied to a point', function () {
  test('Given scaling(2,3,4)and point(-4,6,8) the two multiplied is point(-8,18,32)', function () {
    const scal = new Matrix().scaling(2, 3, 4);
    const P = point(-4, 6, 8);
    const outcome = point(-8, 18, 32);
    const actual = scal.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('A Scaling Matrix applied to a vector', function () {
  test('Given scaling(2,3,4)and vector(-4,6,8) the two multiplied is vector(-8,18,32)', function () {
    const scal = new Matrix().scaling(2, 3, 4);
    const P = vector(-4, 6, 8);
    const outcome = vector(-8, 18, 32);
    const actual = scal.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('A Scaling inverse Matrix applied to a vector', function () {
  test('Given scaling(2,3,4)and vector(-4,6,8) the two multiplied is vector(-8,18,32)', function () {
    const scal = new Matrix().scaling(2, 3, 4);
    const inverse = scal.inverse();
    const P = vector(-4, 6, 8);
    const outcome = vector(-2, 2, 2);
    const actual = inverse.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Reflection is scaling by a negative value', function () {
  test('Given scaling(-1,1,1)and vector(-4,6,8) the two multiplied is vector(-8,18,32)', function () {
    const scal = new Matrix().scaling(-1, 1, 1);
    const P = point(2, 3, 4);
    const outcome = point(-2, 3, 4);
    const actual = scal.matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Rotating a point around the X axis', function(){
  const P = point(0,1,0);
  const half = new Matrix().rotation_x(Math.PI/4);
  test('given point(0,1,0), quarter turn equals point(0,sqr2/2, sqr2/2)', function(){
    const actual = half.matrixMultipliedByTuple(P);
    const outcome = point(0, Math.sqrt(2)/2, Math.sqrt(2)/2);
    expect(actual[1]).toBeCloseTo(outcome[1]);
  })
  test('given point(0,1,0), half turn equlas point(0,0,1)', function(){
    const full = new Matrix().rotation_x(Math.PI/2);
    const outcome = point(0, 0,1)
    const actual = full.matrixMultipliedByTuple(P);
    expect(actual[1]).toBeCloseTo(outcome[1]);
  })
  test('The inverse of an x-rotation rotates in the opposite direction', function(){
    const inv = half.inverse();
    const actual = inv.matrixMultipliedByTuple(P);
    const outcome = point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2)
    expect(actual[2]).toBeCloseTo(outcome[2]);
  })
})
describe('Rotating a point around the y axis', function(){
  const P = point(0,0,1);
  const half = new Matrix().rotation_y(Math.PI/4);
  test('Given point(0,0,1) quarter turn equals point(sqr2/2, 0, sqr2/2)', function(){
    const actual = half.matrixMultipliedByTuple(P);
    const outcome = point(Math.sqrt(2)/2, 0, Math.sqrt(2)/2);
    expect(actual[0]).toBeCloseTo(outcome[0]);
  })
  test('Given point(0,0,1) full turn equals point(sqr2/2, 0, sqr2/2)', function(){
    const full = new Matrix().rotation_y(Math.PI/2);
    const actual = full.matrixMultipliedByTuple(P);
    const outcome = point(1,0,0);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
})
describe('Rotating a point around the z axis', function(){
  const P = point(0,1,0);
  const half = new Matrix().rotation_z(Math.PI/4);
  test('Given point(0,1,0) quarter turn equals point(-sqr2/2, sqr2/2,0)', function(){
    const actual = half.matrixMultipliedByTuple(P);
    const outcome = point(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
    expect(actual[0]).toBeCloseTo(outcome[0]);
  })
  test('Given point(0,1,0) full turn equals point(-sqr2/2, sqr2/2,0)', function(){
    const full = new Matrix().rotation_z(Math.PI/2);
    const actual = full.matrixMultipliedByTuple(P);
    const outcome = point(-1,0,0);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
})
describe('a shearing transformation moves x in proportion to y', function(){
  const P = point(2,3,4);
  test('shearing(1,0,0,0,0,0)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(1,0,0,0,0,0);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(5,3,4);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
  test('shearing(0,1,0,0,0,0)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(0,1,0,0,0,0);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(6,3,4);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
  test('shearing(0,0,1,0,0,0)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(0,0,1,0,0,0);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(2,5,4);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
  test('shearing(0,0,0,1,0,0)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(0,0,0,1,0,0);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(2,7,4);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
  test('shearing(0,0,0,0,1,0)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(0,0,0,0,1,0);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(2,3,6);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
  test('shearing(0,0,0,0,0,1)*point(2,3,4) equals point(5,3,4)', function(){
    const trans = new Matrix().shearing(0,0,0,0,0,1);
    const actual = trans.matrixMultipliedByTuple(P);
    const outcome = point(2,3,7);
    expect(actual).toStrictEqual(expect.arrayContaining(outcome));
  })
})
describe('individual trnsformtions are applied in sequence', function(){
  const P = point(1,0,1);
  const A = new Matrix().rotation_x(Math.PI/2);
  const B = new Matrix().scaling(5,5,5);
  const C = new Matrix().translation(10,5,7);
  const P2 = point(1,-1,0);
  const P3 = point(5,-5,0);
  const P4 = point(15,0,7);
  test('apply rotation first', function(){
    const actual = A.matrixMultipliedByTuple(P);
    expect(actual[1]).toStrictEqual(P2[1]);
  })
  test('then apply scaling', function(){
    const actual = B.matrixMultipliedByTuple(P2);
    expect(actual).toStrictEqual(expect.arrayContaining(P3));
  })
  test('then apply translation', function(){
    const actual = C.matrixMultipliedByTuple(P3);
    expect(actual).toStrictEqual(expect.arrayContaining(P4));
  })
})
describe('chained transformation must be applied in reverse order', function(){
  const P = point(1,0,1);
  const A = new Matrix().rotation_x(Math.PI/2);
  const B = new Matrix().scaling(5,5,5);
  const C = new Matrix().translation(10,5,7);
  const P4 = point(15,0,7);
  test('C*B*A = point(15,0,7)', function(){
    const actual = C.multiplyMatrices(B).multiplyMatrices(A).matrixMultipliedByTuple(P);
    expect(actual).toStrictEqual(expect.arrayContaining(P4));
  })
})