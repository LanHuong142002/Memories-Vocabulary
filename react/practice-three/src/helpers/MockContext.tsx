import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Constants
import { MOCK_PRODUCT_API } from '@constants';

// Contexts
import { ProductContext, ProductContextType } from '@contexts';

export const mockProductContext = {
  errorMessage: 'error',
  products: MOCK_PRODUCT_API,
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: jest.fn(),
  onSearchProducts: jest.fn(),
  onUpdateErrorMessage: jest.fn(),
};

export const MockContext = ({
  children,
  value = mockProductContext,
}: {
  children: ReactNode;
  value?: ProductContextType;
}) => (
  <BrowserRouter>
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
  </BrowserRouter>
);
