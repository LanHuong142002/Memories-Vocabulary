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
    const statusList = customMessageErrors(response, status);

    if (typeof statusList === 'string') {
      throw new ResponseError(statusList);
    }

    return statusList;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { getStatuses };
