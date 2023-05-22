// Constants
import { URL_API } from '@constants';

// Helpers
import { ResponseError, customErrorMessages } from '@helpers';

// Interfaces
import { ProductType } from '@interfaces';

/**
 * @description function get all types
 *
 * @returns {Array} list item
 */
const getTypes = async (): Promise<ProductType[] | string> => {
  try {
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.TYPES}`);
    const types: ProductType[] = await response.json();

    if (!response.ok) {
      const message = customErrorMessages(response);
      throw new ResponseError(message);
    }

    return types;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { getTypes };
