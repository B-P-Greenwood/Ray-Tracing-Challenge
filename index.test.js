import { describe, expect, test } from '@jest/globals';
import { Tuple, point, vector, crossProduct } from './index.js';

describe('Calling tuple(4.3, -4.2, 3.1,1), returns tuple a with following attributes...', function () {
  const outcome = [4.3, -4.2, 3.1, 1];
  const actual = new Tuple(4.3, -4.2, 3.1, 1);
  test('Tuple a equals [4.3, -4.2, 3.1, 1]', function () {
    expect(actual).toEqual(outcome);
  });
  test('a.x = 4.3', function () {
    expect(actual[0]).toStrictEqual(outcome[0]);
  });
  test('a.y = -4.2', function () {
    expect(actual[1]).toStrictEqual(outcome[1]);
  });
  test('a.z = 3.1', function () {
    expect(actual[2]).toStrictEqual(outcome[2]);
  });
  test('a.w = 1.0', function () {
    expect(actual[3]).toStrictEqual(outcome[3]);
  });
  test('a is a point (w=1)', function () {
    expect(actual[3]).toStrictEqual(1);
  });
  test('a is not a vector (w!=1)', function () {
    expect(actual[3]).not.toStrictEqual(0);
  });
});

describe('Calling tuple(4.3, -4.2, 3.1, 0), returns tuple a with following attributes...', function () {
  const outcome = [4.3, -4.2, 3.1, 0];
  const actual = new Tuple(4.3, -4.2, 3.1, 0);
  test('Tuple a equals [4.3, -4.2, 3.1, 0]', function () {
    expect(actual).toEqual(outcome);
  });
  test('a.x = 4.3', function () {
    expect(actual[0]).toStrictEqual(outcome[0]);
  });
  test('a.y = -4.2', function () {
    expect(actual[1]).toStrictEqual(outcome[1]);
  });
  test('a.z = 3.1', function () {
    expect(actual[2]).toStrictEqual(outcome[2]);
  });
  test('a.w = 1.0', function () {
    expect(actual[3]).toStrictEqual(outcome[3]);
  });
  test('a is a vector (w=0)', function () {
    expect(actual[3]).toStrictEqual(0);
  });
  test('a is not a point (w!=1)', function () {
    expect(actual[3]).not.toStrictEqual(1);
  });
});

describe('Tests to confirm that point and vector return valid tuples', function () {
  test('Calling point(4,-4,3) returns a tuple(4,-4,3,1)', function () {
    const outcome = new Tuple(4, -4, 3, 1);
    const actual = point(4, -4, 3);
    expect(actual).toEqual(outcome);
  });
  test('Calling vector(4,-4,3) returns a tuple(4,-4,3,0)', function () {
    const outcome = new Tuple(4, -4, 3, 0);
    const actual = vector(4, -4, 3);
    expect(actual).toEqual(outcome);
  });
});
describe('Test to confirm that two tuples are equal within a amount of variance (0.00001) due to float numbers', function () {
  test('Are [4.00001,-3,3,1] and [4,-3,3,1] considered equal', function () {
    const outcome = true;
    const A = new Tuple(4.00001, -3, 3, 1);
    const B = new Tuple(4, -3, 3, 1);
    const actual = A.equal(B);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Test to confirm adding two tuples is correct', function () {
  test('tuple(3,-2,5,1)+tuple(-2,3,1,0) = tuple(1,1,6,1)', function () {
    const a1 = new Tuple(3, -2, 5, 1);
    const a2 = new Tuple(-2, 3, 1, 0);
    const actual = a1.addTuples(a2);
    const outcome = new Tuple(1, 1, 6, 1);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Test to confirm subtracting two points is the correct vector', function () {
  test('point(3,2,1)-point(5,6,7) = vector(-2,-4,-6)', function () {
    const a1 = point(3, 2, 1);
    const a2 = point(5, 6, 7);
    const actual = a1.minusTuples(a2);
    const outcome = vector(-2, -4, -6);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Test to confirm subtracting a vector from a point gives the correct point', function () {
  test('point(3,2,1)-vector(5,6,7) = point(-2,-4,-6)', function () {
    const a1 = point(3, 2, 1);
    const a2 = vector(5, 6, 7);
    const actual = a1.minusTuples(a2);
    const outcome = point(-2, -4, -6);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Test to confirm subtracting a vector from a vector gives the correct vector', function () {
  test('vector(3,2,1)-vector(5,6,7) = vector(-2,-4,-6)', function () {
    const a1 = vector(3, 2, 1);
    const a2 = vector(5, 6, 7);
    const actual = a1.minusTuples(a2);
    const outcome = vector(-2, -4, -6);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Tests to confirm that subtracting a vector from a zero vector is correct', function () {
  test('vector(1,-2,3) - vector(0,0,0) = vector(-1,2,-3)', function () {
    const a1 = vector(1, -2, 3);
    const a2 = vector(0, 0, 0);
    const actual = a2.minusTuples(a1);
    const outcome = vector(-1, 2, -3);
    expect(actual).toStrictEqual(outcome);
  });
  test('negating tuple(1,-2,3,-4) = vector(-1,2,-3,4)', function () {
    const a1 = new Tuple(1, -2, 3, -4);
    const actual = a1.negate();
    const outcome = new Tuple(-1, 2, -3, 4);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Tests to confirm tuple scaling', function () {
  test('Multiply tuple(1,-2,3,-4) by 3.5 = tuple(3.5,-7,10.5,-14)', function () {
    const a1 = new Tuple(1, -2, 3, -4);
    const actual = a1.scalar(3.5);
    const outcome = new Tuple(3.5, -7, 10.5, -14);
    expect(actual).toStrictEqual(outcome);
  });
  test('Divide tuple(1,-2,3,-4) by 2 = tuple(0.5,-1,1.5,-2)', function () {
    const a1 = new Tuple(1, -2, 3, -4);
    const actual = a1.scalar(0.5);
    const outcome = new Tuple(0.5, -1, 1.5, -2);
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Tests to confirm the magnitude of vectors', function () {
  test('The magnitude of vector(1,0,0) is 1', function () {
    const a1 = vector(1, 0, 0);
    const actual = a1.magnitude();
    const outcome = 1;
    expect(actual).toStrictEqual(outcome);
  });
  test('The magnitude of vector(0,1,0) is 1', function () {
    const a1 = vector(0, 1, 0);
    const actual = a1.magnitude();
    const outcome = 1;
    expect(actual).toStrictEqual(outcome);
  });
  test('The magnitude of vector(0,0,1) is 1', function () {
    const a1 = vector(0, 0, 1);
    const actual = a1.magnitude();
    const outcome = 1;
    expect(actual).toStrictEqual(outcome);
  });
  test('The magnitude of vector(1,2,3) is sqrt14', function () {
    const a1 = vector(1, 2, 3);
    const actual = a1.magnitude();
    const outcome = Math.sqrt(14);
    expect(actual).toStrictEqual(outcome);
  });
  test('The magnitude of vector(-1,-2,-3) is sqrt14', function () {
    const a1 = vector(-1, -2, -3);
    const actual = a1.magnitude();
    const outcome = Math.sqrt(14);
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Tests to confirm the normalisation of a vector', function () {
  test('Vector(4,0,0) normalised is vector(1,0,0)', function () {
    const a1 = vector(4, 0, 0);
    const actual = a1.normalise();
    const outcome = vector(1, 0, 0);
    expect(actual).toStrictEqual(outcome);
  });
  test('Vector(1,2,3) normalised is vector(1/sqrt14, 2/sqrt14, 3/sqrt14)', function () {
    const a1 = vector(1, 2, 3);
    const actual = a1.normalise();
    const sqrt = Math.sqrt(14);
    const outcome = vector(1 / sqrt, 2 / sqrt, 3 / sqrt);
    expect(actual).toStrictEqual(outcome);
  });
  test('The magnitude of a normalised vector(1,2,3) is 1)', function () {
    const a1 = vector(1, 2, 3);
    const norm = a1.normalise();
    const actual = norm.magnitude();
    const outcome = 1;
    expect(actual).toStrictEqual(outcome);
  });
});
describe('Test for the dot product of two vectors', function () {
  test('Vector(1,2,3) and vector(2,3,4) have a dot product of 20', function () {
    const a1 = vector(1, 2, 3);
    const a2 = vector(2, 3, 4);
    const actual = a1.dotProduct(a2);
    const outcome = 20;
    expect(actual).toStrictEqual(outcome);
  });
});

describe('Test for the cross product of two vectors', function () {
  test('vector(1,2,3) and vector(2,3,4) have a cross product of vector(-1,2,-1)', function () {
    const a1 = vector(1, 2, 3);
    const a2 = vector(2, 3, 4);
    const actual = crossProduct(a1, a2);
    const outcome = vector(-1, 2, -1);
    expect(actual).toStrictEqual(outcome);
  });
  test('vector(1,2,3) and vector(2,3,4) have a cross product of vector(-1,2,-1)', function () {
    const a1 = vector(1, 2, 3);
    const a2 = vector(2, 3, 4);
    const actual = crossProduct(a2, a1);
    const outcome = vector(1, -2, 1);
    expect(actual).toStrictEqual(outcome);
  });
});
