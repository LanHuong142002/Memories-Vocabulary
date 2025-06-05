import { MILLION, THOUSAND } from '@constants';

/**
 * @description convert file image to base 64
 *
 * @param {File} file is file have choice from input
 *
 * @returns {Promise} a promise with result is a url base 64 or an error
 */
export const convertBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Unsupported result type'));
      }
    };
    fileReader.onerror = (error) => reject(error);
  });
};

/**
 * @description convert a number to a string with abbreviation suffixes (e.g. 1.5K, 2M)
 *
 * @param number the input number to convert
 *
 * @returns a string with abbreviation suffixes
 */
export const formatPrice = (value: number): string => {
  switch (true) {
    case value >= THOUSAND && value < MILLION:
      return `${value / THOUSAND}K`;
    case value >= MILLION:
      return `${value / MILLION}M`;
    default:
      return `${value}`;
  }
};

/**
 * @description This function takes in a string parameter representing the source of an image returns
 * the complete URL of the image by concatenating the source with the assets URL from the environment variables.
 * @param {string} src A string representing the source of an image.
 *
 * @returns {string} A string representing the complete URL of the image.
 */
export const loadImage = (src: string): string => {
  return `${process.env.VITE_ASSETS_URL}${src}`;
};

/**
 * @description function generate a object to a string param
 *
 * @param {Object} values is an object value input
 *
 * @returns {string}
 */
export const generateSearchParam = <T extends object>(values: T): string => {
  let param = '&';
  for (const [key, value] of Object.entries(values)) {
    if (value) {
      param += `${key}_like=${value}&`;
    }
  }

  return param;
};
