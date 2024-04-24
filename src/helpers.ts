/**
 * Generate a random number between min and max, inclusive
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param {number} hue - value between 0 - 360
 * @param {number} saturation - value between 0 - 100
 * @param {number} brightness - value between 0 - 100
 */
export function hsbToRgb(hue: number, saturation: number, brightness: number) {
  const h = hue / 360;
  const s = saturation / 100;
  const v = brightness / 100;

  let r: number = 0,
    g: number = 0,
    b: number = 0;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}
