// Constants
import { URL_API } from '@constants';

// Helpers
import { customMessageErrors, ResponseError } from '@helpers';

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
      `${URL_API.BASE_URL}${
        URL_API.PRODUCTS + 123
      }?_expand=y89y7y8y statuses&_expand=types${param}`,
    );
    const products: Product[] = await response.json();
    const productList = customMessageErrors<Product[]>(response, products);

    if (typeof productList === 'string') {
      throw new ResponseError(productList);
    }

    return productList;
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
    const productItem = customMessageErrors<Product>(response, product);

    if (typeof productItem === 'string') {
      throw new ResponseError(productItem);
    }

    return productItem;
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
const updateProduct = async (id: string, productUpdate: Product): Promise<Product | string> => {
  try {
    const options = {
      method: 'PATCH',
      body: JSON.stringify(productUpdate),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${URL_API.BASE_URL}${URL_API.PRODUCTS}/${id}`, options);
    const product: Product = await response.json();
    const productItem = customMessageErrors<Product>(response, product);

    if (typeof productItem === 'string') {
      throw new ResponseError(productItem);
    }

    return productItem;
  } catch (error) {
    return (error as ResponseError).message;
  }
};

export { updateProduct, getProductsByParam, deleteProduct };
