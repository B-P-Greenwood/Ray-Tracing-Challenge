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
  for (let i = 0; i < height; i++) {
    let c = color(0, 0, 0);
    let inner = [];
    for (let j = 0; j < width; j++) inner.push(c);
    canvas[i] = inner;
  }
  return canvas;
}

export function canvasToPPM(canvas) {
  const width = canvas[0].length;
  const height = canvas.length;
  let result = `P3\n${width} ${height}\n255`;
  for (let i = 0; i < height; i++) {
    result += '\n';
    let widthCount = 0;
    for (let j = 0; j < width; j++) {
      let c = canvas[i][j];
      let r = c[0];
      let g = c[1];
      let b = c[2];

      if (r < 0) r = 0;
      if (g < 0) g = 0;
      if (b < 0) b = 0;
      if (r > 1) r = 1;
      if (g > 1) g = 1;
      if (b > 1) b = 1;
      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);

      result += `${r} `;
      widthCount += 4;
      if (widthCount >= 67) {
        result += `\n`;
        widthCount = 0;
      }
      result += `${g} `;
      widthCount += 4;
      if (widthCount >= 67) {
        result += `\n`;
        widthCount = 0;
      }
      result += `${b} `;
      widthCount += 4;
    }
  }
  result += '\n';
  return result;
}

export function writePixel(canvas, x, y, color) {
  if (x >= canvas.length || y >= canvas[0].length || x < 0 || y < 0) {
    return canvas;
  } else {
    canvas[x][y] = color;
    return canvas;
  }
}
