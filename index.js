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
