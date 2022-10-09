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
