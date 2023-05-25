import { generateSearchParam } from '@helpers';

describe('Testing generateSearchParam', () => {
  it('should return an empty string when passed an empty object', () => {
    expect(generateSearchParam({})).toEqual('&');
  });

  it('should return a string with one search parameter when an object with one key-value pair', () => {
    expect(generateSearchParam({ name: 'John' })).toEqual('&name_like=John&');
  });

  it('should return a string with multiple search parameter when an object have multiple key-value pairs', () => {
    expect(generateSearchParam({ name: 'John', age: 30 })).toEqual('&name_like=John&age_like=30&');
  });

  it('should not include search parameters when value is empty string', () => {
    expect(generateSearchParam({ name: '', age: 0, active: false })).toEqual('&');
  });
});
