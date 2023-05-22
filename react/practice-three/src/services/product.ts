// Constants
import { URL_API } from '@constants';

// Helpers
import { customErrorMessages, ResponseError } from '@helpers';

// Interfaces
import { Product } from '@interfaces';

/**
 * @description function get all products
 *
 * @param {String} param is endpoint
 *
 * @returns {Array} list products
 */
const getProductsByParam = async (param: string): Promise<Product[] | string> => {
  try {
    const response = await fetch(
      `${URL_API.BASE_URL}${URL_API.PRODUCTS}?_expand=statuses&_expand=types${param}`,
    );
    const products: Product[] = await response.json();

    if (!response.ok) {
      const message = customErrorMessages(response);
      throw new ResponseError(message);
    }

    return products;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

/**
 * @description function post new product
 *
 * @param {Object} productItem is a new product
 */
const postProduct = async (productItem: Product): Promise<Product | string> => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(productItem),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.PRODUCTS}`, options);
    const product: Product = await response.json();

    if (!response.ok) {
      const message = customErrorMessages(response);
      throw new ResponseError(message);
    }

    return product;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

/**
 * @description function delete product by id
 *
 * @param {String} id is id of product
 */
const deleteProduct = async (id: string): Promise<Product | string> => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.PRODUCTS}/${id}`, options);
    const product: Product = await response.json();

    if (!response.ok) {
      const message = customErrorMessages(response);
      throw new ResponseError(message);
    }

    return product;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

/**
 * @description function update product which is selected
 *
 * @param {String} id is id of product
 * @param {Object} productUpdate is information about product, which is selected
 *
 * @return {Object} product
 */
const updateProduct = async (productUpdate: Product): Promise<Product | string> => {
  try {
    const options = {
      method: 'PATCH',
      body: JSON.stringify(productUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `${URL_API.BASE_URL}${URL_API.PRODUCTS}/${productUpdate.id}`,
      options,
    );
    const product: Product = await response.json();

    if (!response.ok) {
      const message = customErrorMessages(response);
      throw new ResponseError(message);
    }

    return product;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { updateProduct, getProductsByParam, deleteProduct, postProduct };
