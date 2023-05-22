import { ReactNode, createContext, useEffect, useMemo, useReducer } from 'react';

// Interfaces
import { Product } from '@interfaces';

// Hooks
import { useProduct } from '@hooks';

// Stores
import { State, reducer } from '@stores';

// Constants
import { ACTIONS } from '@constants';

export interface Context extends State {
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product[]) => Promise<void>;
}

const initialState: State = {
  products: [],
};

export const ProductContext = createContext<Context>({} as Context);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = state;
  const { data: items, error, isLoading } = useProduct();

  useEffect(() => {
    getProducts(items as Product[]);
  }, [items]);

  const getProducts = (products: Product[]) => {
    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: products,
    });
  };

  const addProduct = (product: Product) => {
    dispatch({
      type: ACTIONS.ADD_PRODUCT,
      payload: product,
    });
  };

  const deleteProduct = (id: string) => {
    console.log('a', id);
  };

  const updateProduct = (product: Product[]) => {
    console.log('a', product);
  };

  const value = useMemo(
    () => ({
      products,
      error,
      isLoading,
      addProduct,
      getProducts,
      deleteProduct,
      updateProduct,
    }),
    [products, error, isLoading, getProducts, deleteProduct, updateProduct, addProduct],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
