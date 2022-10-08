export function tuple(x, y, z, w) {
  return [x, y, z, w];
}

export function point(x, y, z) {
  return [x, y, z, 1];
}

export function vector(x, y, z) {
  return [x, y, z, 0];
}

export function equal(a, b) {
  const variance = 0.00001;
  for (let i = 0; i < a.length; i++) {
    if (a[i] - b[i] > variance) return false;
  }
  return true;
}

export function addTuples(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    result.push(a[i] + b[i]);
  }
  return result;
}

export function minusTuples(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    result.push(a[i] - b[i]);
  }
  return result;
}

export function negate(tuple) {
  let result = [];
  tuple.forEach((item) => {
    result.push(-item);
  });
  return result;
}

export function scalar(tuple, scalar) {
  let result = [];
  tuple.forEach((item) => {
    result.push(item * scalar);
  });
  return result;
}

export function magnitude(vector) {
  let reduced = 0;
  vector.forEach((item) => {
    reduced += item * item;
  });
  return Math.sqrt(reduced);
}
export function normalise(tuple) {
  let result = [];
  const mag = magnitude(tuple);
  tuple.forEach((item) => {
    result.push(item / mag);
  });
  return result;
}
export function dotProduct(a, b) {
  let result = 0;
  a.forEach((item, index) => {
    result += item * b[index];
  });
  return result;
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
let p = new Projectile(point(0, 1, 0), normalise(vector(4, 2, 0)));
let e = new Environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));

let ticks = 0;
while (p.position[1] >= 0) {
  p = tick(e, p);
  ticks++;
  console.log('position: ', p.position, 'number of ticks :', ticks);
}
