export const isBoolTrue = (value: number | boolean | string | undefined | null) =>
  'true' === value?.toString().toLowerCase();

export const isBoolFalse = (value: number | boolean | string | undefined | null) =>
  'false' === value?.toString().toLowerCase();

export const makeUniqueWords = (words: (string | number)[]): string[] => {
  const sWords = words
    .filter((w) => w != null)
    .map((w) => (typeof w === 'number' ? w.toString() : w));
  return [...new Set(sWords)];
};
