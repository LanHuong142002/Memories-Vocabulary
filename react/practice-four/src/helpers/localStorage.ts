/**
 * @description function set items to localStorage
 *
 * @param {String} key is name of key in localStorage
 * @param {Array} value
 */
export const setItems = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description function get items from localStorage
 *
 * @param {String} key is name of key in localStorage
 *
 * @returns {Array}
 */
export const getItems = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};
