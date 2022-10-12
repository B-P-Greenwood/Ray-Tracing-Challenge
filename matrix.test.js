import { describe, expect, test } from '@jest/globals';
import { matrix, compareMatrices, multiplyMatrices } from './matrix.js';

describe('Constructing and inspecting a 4x4 matrix \n| 1 | 2 | 3 | 4 |\n| 5.5 | 6.5 | 7.5 | 8.5 |\n| 9 | 10 | 11 | 12 |\n| 13.5 | 14.5 | 15.5 | 16.5 |', function () {
  const M = matrix([
    [1, 2, 3, 4],
    [5.5, 6.5, 7.5, 8.5],
    [9, 10, 11, 12],
    [13.5, 14.5, 15.5, 16.5],
  ]);

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
  const M = matrix([
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1],
  ]);

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
  const A = matrix([
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1],
  ]);
  const B = matrix([
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1],
  ]);
  test('A === B', function () {
    const outcome = true;
    const actual = compareMatrices(A, B);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Matrix equality with un-identical matrices. A = \n| -3 | 5 | 0 |\n| 1 | -2 | -7 |\n| 0 | 1 | 1 | B = \n| -1 | 5 | 0 |\n| 1 | -2 | -8 |\n| 0 | 1 | 2 |', function () {
  const A = matrix([
    [-3, 5, 0],
    [1, -2, -7],
    [0, 1, 1],
  ]);
  const B = matrix([
    [-1, 5, 0],
    [1, -2, -8],
    [0, 1, 2],
  ]);
  test('A !== B', function () {
    const outcome = true;
    const actual = compareMatrices(A, B);
    expect(actual).not.toStrictEqual(outcome);
  });
});
describe('Multiply two 4x4 matrices A= \n| 1 | 2 | 3 | 4 |\n| 5 | 6 | 7 | 8 |\n| 9 | 8 | 7 | 6 |\n| 5 | 4 | 3 | 2 | B= \n| -2 | 1 | 2 | 3 |\n| 3 | 2 | 1 | -1 |\n| 4 | 3 | 6 | 5 |\n| 1 | 2 | 7 | 8 |', function () {
  const A = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 8, 7, 6],
    [5, 4, 3, 2],
  ];
  const B = [
    [-2, 1, 2, 3],
    [3, 2, 1, -1],
    [4, 3, 6, 5],
    [1, 2, 7, 8],
  ];
  test('A * B = | 20 | 22 | 50 | 48 |\n| 44 | 54 | 114 | 108 |\n| 40 | 58 | 110 | 102 |\n| 16 | 26 | 46 | 42 |', function () {
    const actual = multiplyMatrices(A, B);
    const outcome = [
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42],
    ];
    expect(actual).toStrictEqual(outcome);
  });
});
