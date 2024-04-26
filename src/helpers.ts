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

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

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

export type HsbValues = {
  h: number;
  s: number;
  b: number;
};

export const getRandomHsb = (): HsbValues => ({
  h: randomIntFromInterval(0, 359),
  s: randomIntFromInterval(0, 100),
  b: randomIntFromInterval(20, 100),
});

const getMinorAngle = (angleInDegree: number) =>
  angleInDegree > 180 ? 360 - angleInDegree : angleInDegree;

export const computeMarks = (hsbGuess: HsbValues, actualHsb: HsbValues) => {
  const hMarks =
    (180 - Math.abs(getMinorAngle(hsbGuess.h - actualHsb.h))) / 180;
  const sMarks = (100 - Math.abs(hsbGuess.s - actualHsb.s)) / 100;
  const bMarks = (100 - Math.abs(hsbGuess.b - actualHsb.b)) / 100;

  return Math.round(((hMarks + sMarks + bMarks) / 3) * 100);
};
