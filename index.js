export function point(x, y, z) {
  return new Tuple(x, y, z, 1);
}

export function vector(x, y, z) {
  return new Tuple(x, y, z, 0);
}

export class Tuple extends Array {
  static get [Symbol.species]() {
    return this;
  }

  equal(b) {
    const variance = 0.00001;
    for (let i = 0; i < this.length; i++) {
      if (this[i] - b[i] > variance) return false;
    }
    return true;
  }

  addTuples(b) {
    let result = new Tuple();
    for (let i = 0; i < this.length; i++) {
      result.push(this[i] + b[i]);
    }
    return result;
  }

  minusTuples(b) {
    let result = new Tuple();
    for (let i = 0; i < this.length; i++) {
      result.push(this[i] - b[i]);
    }
    return result;
  }

  negate() {
    let result = new Tuple();
    this.forEach((item) => {
      result.push(-item);
    });

    return result;
  }
  scalar(scalar) {
    let result = new Tuple();
    this.forEach((item) => {
      result.push(item * scalar);
    });
    return result;
  }

  magnitude() {
    let reduced = 0;
    this.forEach((item) => {
      reduced += item * item;
    });
    return Math.sqrt(reduced);
  }
  normalise() {
    let result = new Tuple();
    const mag = this.magnitude();
    this.forEach((item) => {
      result.push(item / mag);
    });
    return result;
  }
  dotProduct(b) {
    let result = 0;
    this.forEach((item, index) => {
      result += item * b[index];
    });
    return result;
  }
}
export function crossProduct(a, b) {
  // x = 0;
  // y = 1;
  // z = 2;
  let crossX = a[1] * b[2] - a[2] * b[1];
  let crossY = a[2] * b[0] - a[0] * b[2];
  let crossZ = a[0] * b[1] - a[1] * b[0];
  return vector(crossX, crossY, crossZ);
}

export function tick(env, proj) {
  let position = [];
  let velocity = [];
  proj.position.forEach((item, index) => {
    position.push(item + proj.velocity[index]);
  });

  proj.velocity.forEach((item, index) => {
    velocity.push(item + env.gravity[index] + env.wind[index]);
  });
  return new Projectile(position, velocity);
}

class Projectile {
  constructor(position, velocity) {
    this.position = position; //point
    this.velocity = velocity; //vector
  }
}

class Environment {
  constructor(gravity, wind) {
    this.gravity = gravity; //vector
    this.wind = wind; //vector
  }
}

/*
Chapter 2 output
let p = new Projectile(point(100, 1, 0), vector(4, 10, 0));
let e = new Environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));
import { canvas, canvasToPPM, writePixel, color } from './canvas.js';
import fs from 'fs';
let ticks = 0;
let c = canvas(900, 550);
let red = color(1, 0, 0);
while (p.position[1] >= 0) {
  writePixel(
    c,
    Math.round(p.position[0]),
    c.length - 1 - Math.round(p.position[1]),
    red
  );
  p = tick(e, p);
  ticks++;
}
const output = canvasToPPM(c);
fs.writeFile('./Created Images/canvasImage.ppm', output, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
/*
import { canvas, canvasToPPM, writePixel, color } from './canvas.js';
let c = canvas(5, 3);
const c1 = color(1.5, 0, 0);
const c2 = color(0, 0.5, 0);
const c3 = color(-0.5, 0, 1);
c = writePixel(c, 0, 0, c1);
c = writePixel(c, 2, 1, c2);
c = writePixel(c, 4, 2, c3);
const actual = canvasToPPM(c);
console.log(actual);
*/
