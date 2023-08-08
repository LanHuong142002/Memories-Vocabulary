import axios from 'axios';

// Constants
import { URL } from '@constants';

/**
 * @description function get all data
 *
 * @param {String} endpoint is url endpoint
 *
 * @returns {T} data
 */
export const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await axios.get<T>(`${URL.BASE}${endpoint}`);

  return response.data;
};

/**
 * @description function post data
 *
 * @param {items} item is new item
 * @param {String} endpoint is url endpoint
 *
 * @returns {T} data
 */
export const postData = async <T>(items: T, endpoint: string): Promise<T> => {
  const response = await axios.post<T>(`${URL.BASE}${endpoint}`, items);

  return response.data;
};

/**
 * @description function put data
 *
 * @param {items} item is item updated
 * @param {String} endpoint is url endpoint
 *
 * @returns {T} data
 */
export const putData = async <T>(items: T, endpoint: string): Promise<T> => {
  const response = await axios.put<T>(`${URL.BASE}${endpoint}`, items);

  return response.data;
};
