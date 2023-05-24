import { convertBase64, formatPrice, loadImage } from '@helpers';

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
});

describe('Testing loadImage function', () => {
  it('Should return a url image correctly', () => {
    process.env.VITE_ASSETS_URL = 'https://test';
    const src = '/image.jpg';
    const expectedUrl = 'https://test/image.jpg';

    expect(loadImage(src)).toEqual(expectedUrl);
  });
});
