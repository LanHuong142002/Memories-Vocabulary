// Constants
import { URL_API } from '@constants';

// Helpers
import { ResponseError, customMessageErrors } from '@helpers';

/**
 * @description function get all statuses
 *
 * @returns {Array} list statuses
 */
const getStatuses = async <T>(): Promise<T[] | string> => {
  try {
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.STATUSES}`);
    const status: T[] = await response.json();

    if (!response.ok) {
      const message = customMessageErrors(response);
      throw new ResponseError(message);
    }
    return status;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { getStatuses };
