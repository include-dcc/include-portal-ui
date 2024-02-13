export const isBoolTrue = (value: number | boolean | string | undefined | null) =>
  'true' === value?.toString().toLowerCase();

export const isBoolFalse = (value: number | boolean | string | undefined | null) =>
  'false' === value?.toString().toLowerCase();

export const makeUniqueWords = (words: string[]) => [...new Set(words)];
