export const URL_API = {
  BASE_URL: process.env.VITE_BASE_URL,
  PRODUCTS_WITH_STATUS_TYPE: `${process.env.VITE_BASE_URL}/products?_expand=statuses&_expand=types`,
  PRODUCTS: '/products',
  TYPES: '/types',
  STATUSES: '/statuses',
};
