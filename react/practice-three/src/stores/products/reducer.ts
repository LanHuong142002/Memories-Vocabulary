import { ACTIONS } from '@constants';
import { Product } from '@interfaces';
import { ProductActions } from '@stores';

interface State {
  products: Product[];
}

export const initialState: State = {
  products: [],
};

const reducer = (state: State = initialState, action: ProductActions): State => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          } else {
            return product;
          }
        }),
      };
    default:
      return state;
  }
};

export { reducer };
export type { State };
