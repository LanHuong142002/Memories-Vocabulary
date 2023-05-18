// Constants
import { URL_API } from '@constants';

// Helpers
import { ResponseError, customMessageErrors } from '@helpers';

// Interfaces
import { ProductStatus } from '@interfaces';

/**
 * @description function get all statuses
 *
 * @returns {Array} list statuses
 */
const getStatuses = async (): Promise<ProductStatus[] | string> => {
  try {
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.STATUSES}`);
    const statuses: ProductStatus[] = await response.json();

    if (!response.ok) {
      const message = customMessageErrors(response);
      throw new ResponseError(message);
    }
    return statuses;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { getStatuses };
