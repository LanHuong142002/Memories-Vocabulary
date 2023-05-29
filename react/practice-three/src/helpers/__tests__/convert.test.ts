import { convertBase64, formatPrice, generateSearchParam, loadImage } from '@helpers';

describe('Testing convertBase64', () => {
  it('Should resolve with a base64 url when given a valid file', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const result = await convertBase64(file);

    expect(typeof result).toBe('string');
  });

  it('Should reject with an error when given an invalid file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    try {
      await convertBase64(file);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('Testing format price function', () => {
  it('Should return number with K if value more than 1000', () => {
    const number = formatPrice(2000);

    expect(number).toEqual('2K');
  });

  it('Should return number with M if value more than 1000000', () => {
    const number = formatPrice(1000000);

    expect(number).toEqual('1M');
  });

  it('Should return number default', () => {
    const number = formatPrice(100);

    expect(number).toEqual('100');
  });

  it('Should return default number if number is a negative number', () => {
    const number = formatPrice(-2000);

    expect(number).toEqual('-2000');
  });

  it('Should return decimal value when number is odd number', () => {
    const number = formatPrice(2560);

    expect(number).toEqual('2.56K');
  });

  it('Should return large number with unit when pass to function large number', () => {
    const number = formatPrice(25600000000);

    expect(number).toEqual('25600M');
  });
});

describe('Testing loadImage function', () => {
  it('Should return a url image correctly', () => {
    process.env.VITE_ASSETS_URL = 'https://test';
    const src = '/image.jpg';
    const expectedUrl = 'https://test/image.jpg';

    expect(loadImage(src)).toEqual(expectedUrl);
  });

  it('Should throw an error if src is an empty string', () => {
    const src = '';
    process.env.VITE_ASSETS_URL = 'https://test';
    const expectedUrl = 'https://test';

    expect(loadImage(src)).toEqual(expectedUrl);
  });
});

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
