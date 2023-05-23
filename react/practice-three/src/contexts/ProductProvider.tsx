import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

// Interfaces
import { Product } from '@interfaces';

// Hooks
import { useProduct } from '@hooks';

// Stores
import { State, initialState, reducer } from '@stores';

// Constants
import { ACTIONS } from '@constants';

// Services
import { deleteProduct, getProductsByParam, postProduct, updateProduct } from '@services';

export interface Context extends State {
  products: Product[];
  message: string;
  handleAddProduct: (product: Product) => void;
  handleGetProducts: (products: Product[]) => void;
  handleDeleteProduct: (id: string) => void;
  handleUpdateProduct: (product: Product) => void;
  handleSearchProducts: (param: string) => void;
}

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = state;
  const [message, setMessage] = useState('');
  const { data: items, error, isLoading } = useProduct();

  /**
   * @description function get products
   */
  const handleGetProducts = useCallback(() => {
    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: items as Product[],
    });
  }, [items]);

  /**
   * @description get products after search
   */
  const handleSearchProducts = useCallback(async (param: string) => {
    const productItem = await getProductsByParam(param);

    if (typeof productItem === 'string') {
      setMessage(productItem);
    } else {
      dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: productItem,
      });
    }
  }, []);

  /**
   * @description function add new product
   */
  const handleAddProduct = useCallback(async (product: Product) => {
    const productItem = await postProduct(product);

    if (typeof productItem === 'string') {
      setMessage(productItem);
    } else {
      dispatch({
        type: ACTIONS.ADD_PRODUCT,
        payload: productItem,
      });
    }
  }, []);

  /**
   * @description function delete product
   */
  const handleDeleteProduct = useCallback(async (id: string) => {
    const productItem = await deleteProduct(id);

    if (typeof productItem === 'string') {
      setMessage(productItem);
    } else {
      dispatch({
        type: ACTIONS.DELETE_PRODUCT,
        payload: id,
      });
    }
  }, []);

  /**
   * @description function update product
   */
  const handleUpdateProduct = useCallback(async (product: Product) => {
    const productItem = await updateProduct(product);

    if (typeof productItem === 'string') {
      setMessage(productItem);
    } else {
      dispatch({
        type: ACTIONS.UPDATE_PRODUCT,
        payload: productItem,
      });
    }
  }, []);

  useEffect(() => {
    if (items) {
      handleGetProducts();
    }
  }, [handleGetProducts, items]);

  const value = useMemo(
    () => ({
      products,
      error,
      isLoading,
      message,
      handleAddProduct,
      handleGetProducts,
      handleDeleteProduct,
      handleUpdateProduct,
      handleSearchProducts,
    }),
    [
      products,
      error,
      isLoading,
      message,
      handleGetProducts,
      handleDeleteProduct,
      handleUpdateProduct,
      handleAddProduct,
      handleSearchProducts,
    ],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
