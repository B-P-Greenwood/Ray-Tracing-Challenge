export function color(red, green, blue) {
  return [red, green, blue];
}

export function HadamardProduct(color1, color2) {
  let result = [];
  color1.forEach((item, index) => {
    result.push(item * color2[index]);
  });
  return result;
}
export function canvas(width, height) {
  let canvas = new Array(height);
  for (let i = 0; i < canvas.length; i++) {
    canvas[i] = new Array(width);
  }
  return canvas;
}
