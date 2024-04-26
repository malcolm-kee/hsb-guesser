import { expect, test } from 'vitest';
import { computeMarks } from './helpers';

test('computeMarks', () => {
  expect(computeMarks({ h: 100, s: 50, b: 50 }, { h: 100, s: 50, b: 50 })).toBe(
    100
  );
  expect(computeMarks({ h: 180, s: 0, b: 0 }, { h: 0, s: 100, b: 100 })).toBe(
    0
  );
  expect(computeMarks({ h: 288, s: 0, b: 0 }, { h: 0, s: 100, b: 100 })).toBe(
    20
  );
  expect(computeMarks({ h: 72, s: 0, b: 0 }, { h: 0, s: 100, b: 100 })).toBe(
    20
  );
  expect(computeMarks({ h: 100, s: 20, b: 50 }, { h: 100, s: 50, b: 50 })).toBe(
    90
  );
  expect(computeMarks({ h: 100, s: 80, b: 50 }, { h: 100, s: 50, b: 50 })).toBe(
    90
  );
  expect(computeMarks({ h: 100, s: 50, b: 20 }, { h: 100, s: 50, b: 50 })).toBe(
    90
  );
  expect(computeMarks({ h: 100, s: 50, b: 80 }, { h: 100, s: 50, b: 50 })).toBe(
    90
  );
});
