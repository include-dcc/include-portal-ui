import { keepOnly } from './helper';

describe(`${keepOnly.name}()`, () => {
  it('should handle edge case', () => {
    expect(keepOnly({ a: null, b: undefined })).toEqual({});
  });

  it('should keep only wanted entries', () => {
    expect(keepOnly({ a: 'a', b: 2 }, ([, v]) => typeof v === 'number')).toEqual({ b: 2 });
  });
});
