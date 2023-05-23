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
  messageError: string;
  handleAddProduct: (product: Product) => void;
  handleGetProducts: (products: Product[]) => void;
  handleDeleteProduct: (id: string) => void;
  handleUpdateProduct: (product: Product) => void;
  handleSearchProducts: (param: string) => void;
  handleSetMessageError: (message: string) => void;
}

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = state;
  const [messageError, setMessageError] = useState('');
  const { data: items, error, isLoading } = useProduct();

  /**
   * @description function set message error
   */
  const handleSetMessageError = useCallback((message: string) => {
    setMessageError(message);
  }, []);

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
    const response = await getProductsByParam(param);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: response,
      });
    }
  }, []);

  /**
   * @description function add new product
   */
  const handleAddProduct = useCallback(async (product: Product) => {
    const response = await postProduct(product);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      dispatch({
        type: ACTIONS.ADD_PRODUCT,
        payload: response,
      });
    }
  }, []);

  /**
   * @description function delete product
   */
  const handleDeleteProduct = useCallback(async (id: string) => {
    const response = await deleteProduct(id);

    if (typeof response === 'string') {
      setMessageError(response);
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
    const response = await updateProduct(product);

    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      dispatch({
        type: ACTIONS.UPDATE_PRODUCT,
        payload: response,
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
      messageError,
      handleAddProduct,
      handleGetProducts,
      handleDeleteProduct,
      handleUpdateProduct,
      handleSearchProducts,
      handleSetMessageError,
    }),
    [
      products,
      error,
      isLoading,
      messageError,
      handleGetProducts,
      handleDeleteProduct,
      handleUpdateProduct,
      handleAddProduct,
      handleSearchProducts,
      handleSetMessageError,
    ],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
