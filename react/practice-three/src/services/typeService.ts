// Constants
import { URL_API } from '@constants';

// Helpers
import { ResponseError, customMessageErrors } from '@helpers';

/**
 * @description function get all types
 *
 * @returns {Array} list item
 */
const getTypes = async <T>(): Promise<T[] | string> => {
  try {
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.TYPES}`);
    const types: T[] = await response.json();
    const typeList = customMessageErrors(response, types);

    if (typeof typeList === 'string') {
      throw new ResponseError(typeList);
    }

    return typeList;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { getTypes };
