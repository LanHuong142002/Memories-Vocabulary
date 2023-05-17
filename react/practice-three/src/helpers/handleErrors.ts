import { STATUS_CODE } from '@constants';

/**
 * @description function custom error based on status code from
 * response and item if this status is success
 *
 * @param {Object} response is response received after call api
 * @param {Object} items is data received after call api
 *
 * @returns {Object}
 */
const customMessageErrors = <T>(response: Response, items: T): string | T => {
  switch (response.status) {
    case STATUS_CODE.OK:
    case STATUS_CODE.CREATED:
      return items;
    case STATUS_CODE.BAD_REQUEST:
      return `${response.status} Bad Request`;
    case STATUS_CODE.UNAUTHORIZED:
      return `${response.status} Unauthorized`;
    case STATUS_CODE.FORBIDDEN:
      return `${response.status} Forbidden`;
    case STATUS_CODE.NOT_FOUND:
      return `${response.status} Page Not Found`;
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      return `${response.status} Internal Server Error`;
    case STATUS_CODE.SERVER_UNAVAILABLE:
      return `${response.status} Service Unavailable`;
    default:
      return `${response.status} Fail to fetch`;
  }
};

export { customMessageErrors };
