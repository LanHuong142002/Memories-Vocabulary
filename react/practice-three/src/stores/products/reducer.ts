import { ACTIONS } from '@constants';
import { Product } from '@interfaces';
import { ProductActions } from '@stores';

interface State {
  products: Product[];
}

const reducer = (state: State, action: ProductActions): State => {
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
    default:
      return state;
  }
};

export { reducer };
export type { State };
