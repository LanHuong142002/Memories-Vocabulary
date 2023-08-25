import axios from 'axios';

// Constants
import { URL as linkURL } from '@constants';

/**
 * @description function get all data
 *
 * @param {String} endpoint is url endpoint
 *
 * @returns {T} data
 */
export const getData = async <T>(
  endpoint: string,
  page?: number,
  limit: number = 20,
): Promise<T[]> => {
  const params = {
    page: page?.toString(),
    limit: limit.toString(),
  };
  const response = await axios.get<T[]>(`${linkURL.BASE}${endpoint}`, { params });

  return response.data;
};

/**
 * @description function post data
 *
 * @param {String} item is url endpoint
 * @param {Object} endpoint new item
 *
 * @returns {T} data
 */
export const postData = async <T>(item: T, endpoint: string): Promise<T> => {
  const response = await axios.post<T>(`${linkURL.BASE}${endpoint}`, item);

  return response.data;
};

/**
 * @description function put data
 *
 * @param {Object} item is a item want to update
 * @param {String} endpoint is url endpoint
 * @param {String} id is id of item want to update
 *
 * @returns {T} data
 */
export const putData = async <T>(item: T, endpoint: string, id: string): Promise<T> => {
  const response = await axios.put<T>(`${linkURL.BASE}${endpoint}/${id}`, item);

  return response.data;
};

/**
 * @description function delete data
 *
 * @param {String} endpoint is url endpoint
 * @param {String} id is id of item want to delete
 *
 * @returns {T} data
 */
export const deleteData = async <T>(endpoint: string, id: string): Promise<T> => {
  const response = await axios.delete<T>(`${linkURL.BASE}${endpoint}/${id}`);

  return response.data;
};
