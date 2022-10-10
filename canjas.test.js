import { describe, expect, test } from '@jest/globals';
import {
  color,
  HadamardProduct,
  canvas,
  canvasToPPM,
  writePixel,
} from './canvas.js';
import { addTuples, minusTuples, scalar } from './index.js';

describe('Colors are red green blue tuples', function () {
  test('color(-0.5,0.4,1.7) has red value of -0.5', function () {
    const red = -0.5;
    const actual = color(-0.5, 0.4, 1.7);
    expect(actual[0]).toStrictEqual(red);
  });
  test('color(-0.5,0.4,1.7) has green value of 0.4', function () {
    const green = 0.4;
    const actual = color(-0.5, 0.4, 1.7);
    expect(actual[1]).toStrictEqual(green);
  });
  test('color(-0.5,0.4,1.7) has blue value of 1.7', function () {
    const blue = 1.7;
    const actual = color(-0.5, 0.4, 1.7);
    expect(actual[2]).toStrictEqual(blue);
  });
});
describe('Manipulating colors', function () {
  test('Adding colors', function () {
    const c1 = color(0.9, 0.6, 0.75);
    const c2 = color(0.7, 0.1, 0.25);
    const actual = addTuples(c1, c2);
    const outcome = [1.6, 0.7, 1.0];
    expect(actual).toStrictEqual(outcome);
  });
  test('Subtracting colors', function () {
    const c1 = color(0.9, 0.6, 0.75);
    const c2 = color(0.7, 0.1, 0.25);
    const temp = minusTuples(c1, c2);
    const actual = [];
    temp.forEach((item) => {
      actual.push(Number(item.toFixed(1)));
    });
    const outcome = [0.2, 0.5, 0.5];
    expect(actual).toStrictEqual(outcome);
  });
  test('Adding colors', function () {
    const c1 = color(0.2, 0.3, 0.4);
    const actual = scalar(c1, 2);
    const outcome = [0.4, 0.6, 0.8];
    expect(actual).toStrictEqual(outcome);
  });
  test('Multiplying colors', function () {
    const c1 = color(1, 0.2, 0.4);
    const c2 = color(0.9, 1, 0.1);
    const actual = HadamardProduct(c1, c2);
    const outcome = [0.9, 0.2, 0.04];
    expect(actual[0]).toBeGreaterThanOrEqual(outcome[0]);
    expect(actual[1]).toBeGreaterThanOrEqual(outcome[1]);
    expect(actual[2]).toBeGreaterThanOrEqual(outcome[2]);
  });
});
describe('Creating a canvas', function () {
  test('Canvas(10, 20) creates a canvas with width = 10', function () {
    const actual = canvas(10, 20);
    const outcome = 10;
    expect(actual[0].length).toStrictEqual(outcome);
  });
  test('Canvas(10, 20) creates a canvas with height = 20', function () {
    const actual = canvas(10, 20);
    const outcome = 20;
    expect(actual.length).toStrictEqual(outcome);
  });
});
describe('Constructing the PPM header', function () {
  test('A canvas canvas(5,3) has PPM header p3, 5 3, 255', function () {
    const c = canvas(5, 3);
    const actual = canvasToPPM(c);
    const outcome = /P3\n5 3\n255/;
    expect(actual).toMatch(outcome);
  });
});
describe('Constructing the PPM pixel data', function () {
  test('Given a canvas with set pixels a correct PPM image is returned', function () {
    let c = canvas(5, 3);
    const c1 = color(1.5, 0, 0);
    const c2 = color(0, 0.5, 0);
    const c3 = color(-0.5, 0, 1);
    c = writePixel(c, 0, 0, c1);
    c = writePixel(c, 2, 1, c2);
    c = writePixel(c, 4, 2, c3);
    const actual = canvasToPPM(c);
    const outcome =
      /P3\n5 3\n255\n255,0,00,0,00,0,00,0,00,0,0\n0,0,00,0,00,128,00,0,00,0,0\n0,0,00,0,00,0,00,0,00,0,255/;
    expect(actual).toMatch(outcome);
  });
});
