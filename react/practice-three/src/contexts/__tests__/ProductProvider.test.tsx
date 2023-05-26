import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA } from '@constants';
import { render, screen } from '@testing-library/react';
import { ProductContext, ProductProvider } from '@contexts';
import { useContext } from 'react';

const MockContextValue = {
  products: MOCK_PRODUCT_API,
  messageError: '',
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: jest.fn(),
  onSearchProducts: jest.fn(),
  onSetMessageError: jest.fn(),
};

jest.mock('@services', () => ({
  postProduct: jest.fn(() => {
    return MOCK_PRODUCT_DATA;
  }),
}));

describe('Testing context ProductProvider', () => {
  const { onAddProduct, products } = useContext(ProductContext);

  it('Should render children', () => {
    render(
      <ProductProvider>
        <div data-testid='testing-children'>Testing children</div>
      </ProductProvider>,
    );
    onAddProduct({});

    expect(products).toEqual(MOCK_PRODUCT_DATA);
  });

  it('Should provide context value for children', () => {
    const Component = () => {
      const { products } = useContext(ProductContext);

      return (
        <div>
          {products &&
            products.map((item) => (
              <p key={item.id} data-testid='testing-name'>
                {item.name}
              </p>
            ))}
        </div>
      );
    };

    const { rerender } = render(
      <ProductProvider>
        <Component />
      </ProductProvider>,
    );

    expect(screen.getByTestId('testing-name')).toBe('');

    rerender(
      <ProductContext.Provider value={MockContextValue}>
        <Component />
      </ProductContext.Provider>,
    );
    expect(screen.getByTestId('testing-name')).toBe(MOCK_PRODUCT_DATA.name);
  });
});
