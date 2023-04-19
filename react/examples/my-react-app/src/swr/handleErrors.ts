type CustomErrors = {
  messageError: string;
  status: number;
};

/**
 * @description function custom error based on status code from
 * response and item if this status is success
 *
 * @param {Object} response is response received after call api
 * @param {Object} items is data received after call api
 *
 * @returns {Object}
 */
const customErrors = <T>(response: Response, items: T): T => {
  switch (response.status) {
    case 400:
      throw { message: `${response.status} Bad Request`, status: response.status };
    case 401:
      throw { message: `${response.status} Unauthorized`, status: response.status };
    case 403:
      throw { message: `${response.status} Forbidden`, status: response.status };
    case 404:
      throw { message: `${response.status} Page Not Found`, status: response.status };
    case 500:
      throw { message: `${response.status} Internal Server Error`, status: response.status };
    case 503:
      throw { message: `${response.status} Service Unavailable`, status: response.status };
    default:
      throw { message: `${response.status} Fail to fetch`, status: response.status };
  }
};

export { customErrors };
export type { CustomErrors };
