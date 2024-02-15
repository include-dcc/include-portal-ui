import { isBoolFalse, isBoolTrue, makeUniqueWords } from 'helpers';

describe('isBoolTrue', () => {
  test('returns true for boolean true', () => {
    expect(isBoolTrue(true)).toBe(true);
  });

  test('returns true for string "true"', () => {
    expect(isBoolTrue('true')).toBe(true);
  });

  test('returns false for any other input', () => {
    expect(isBoolTrue(false)).toBe(false);
    expect(isBoolTrue('false')).toBe(false);
    expect(isBoolTrue(undefined)).toBe(false);
    expect(isBoolTrue(null)).toBe(false);
    expect(isBoolTrue(0)).toBe(false);
    expect(isBoolTrue(1)).toBe(false);
    expect(isBoolTrue('')).toBe(false);
  });
});

describe('isBoolFalse', () => {
  test('returns true for boolean false', () => {
    expect(isBoolFalse(false)).toBe(true);
  });

  test('returns true for string "false"', () => {
    expect(isBoolFalse('false')).toBe(true);
  });

  test('returns false for any other input', () => {
    expect(isBoolFalse(true)).toBe(false);
    expect(isBoolFalse('true')).toBe(false);
    expect(isBoolFalse(undefined)).toBe(false);
    expect(isBoolFalse(null)).toBe(false);
    expect(isBoolFalse(0)).toBe(false);
    expect(isBoolFalse(1)).toBe(false);
    expect(isBoolFalse('')).toBe(false);
  });
});

describe('makeUniqueWords', () => {
  test('removes duplicates from array', () => {
    const input = ['apple', 'banana', 'apple', 'orange', 'banana'];
    const expectedOutput = ['apple', 'banana', 'orange'];
    expect(makeUniqueWords(input)).toEqual(expectedOutput);
  });

  test('returns the same array if no duplicates', () => {
    const input = ['apple', 'banana', 'orange'];
    expect(makeUniqueWords(input)).toEqual(input);
  });

  test('returns an empty array for an empty input array', () => {
    expect(makeUniqueWords([])).toEqual([]);
  });
});
