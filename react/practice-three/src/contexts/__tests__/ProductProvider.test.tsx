import { fireEvent, render } from '@testing-library/react';
import { ProductContext, ProductProvider } from '@contexts';
import { useContext } from 'react';
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA, URL_API } from '@constants';
import { act } from 'react-test-renderer';
import * as services from '@services';
import * as useSWR from 'swr';

const mockValue = {
  errorMessage: 'Error',
  products: MOCK_PRODUCT_API,
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: jest.fn(),
  onSearchProducts: jest.fn(),
  onUpdateErrorMessage: jest.fn(),
};

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

jest.mock('swr', () => ({ __esModule: true, ...jest.requireActual('swr') }));

describe('Testing Product Context', () => {
  it('Should render message if dont have any products when click the button ', () => {
    const value = {
      ...mockValue,
      products: undefined,
    };

    const MockChildren = () => {
      const { products } = useContext(ProductContext);
      return (
        <>
          {products ? (
            products.map((item) => <p data-testid='product-name'>{item.name}</p>)
          ) : (
            <p>No products display</p>
          )}
        </>
      );
    };
    const { getByText } = render(
      <ProductContext.Provider value={value}>
        <MockChildren />
      </ProductContext.Provider>,
    );
    const text = getByText('No products display');

    expect(text).toBeInTheDocument();
  });

  it('Should render products when click the button with correctly name', () => {
    const MockChildren = () => {
      const { products } = useContext(ProductContext);
      return (
        <>
          {products ? (
            products.map((item) => (
              <p data-testid='product-name' key={item.id}>
                {item.name}
              </p>
            ))
          ) : (
            <p>No products display</p>
          )}
        </>
      );
    };
    const { getByText } = render(
      <ProductContext.Provider value={mockValue}>
        <MockChildren />
      </ProductContext.Provider>,
    );
    const text = getByText(MOCK_PRODUCT_DATA.name);

    expect(text).toBeInTheDocument();
  });

  it('Should render products filtered when click the button', async () => {
    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onSearchProducts } = useContext(ProductContext);
      return <button title='Submit' onClick={() => onSearchProducts('&name=123')} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}`);
  });

  it('Should call mutate when add product success', async () => {
    const postProductMock = jest.spyOn(services, 'postProduct');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onAddProduct } = useContext(ProductContext);
      return <button title='Submit' onClick={() => onAddProduct(MOCK_PRODUCT_DATA)} />;
    };

    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
  });

  it('Should return a message if add product fails', async () => {
    const postProductMock = jest.spyOn(services, 'postProduct');
    postProductMock.mockResolvedValue('Error');

    const MockChildren = () => {
      const { errorMessage, onAddProduct } = useContext(ProductContext);
      return (
        <>
          <p>{errorMessage}</p>
          <button title='Submit' onClick={() => onAddProduct(MOCK_PRODUCT_DATA)} />
        </>
      );
    };

    const { getByRole, getByText } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });
    const error = getByText('Error');

    expect(error).toBeInTheDocument();
  });

  it('Should call mutate when delete success', async () => {
    const postProductMock = jest.spyOn(services, 'deleteProduct');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onDeleteProduct } = useContext(ProductContext);
      return <button title='Submit' onClick={() => onDeleteProduct(MOCK_PRODUCT_DATA.id)} />;
    };

    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
  });

  it('Should return a message if delete product fails', async () => {
    const postProductMock = jest.spyOn(services, 'deleteProduct');
    postProductMock.mockResolvedValue('Error');

    const MockChildren = () => {
      const { errorMessage, onDeleteProduct } = useContext(ProductContext);
      return (
        <>
          <p>{errorMessage}</p>
          <button title='Submit' onClick={() => onDeleteProduct(MOCK_PRODUCT_DATA.id)} />
        </>
      );
    };

    const { getByRole, getByText } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });
    const error = getByText('Error');

    expect(error).toBeInTheDocument();
  });

  it('Should call mutate when update success', async () => {
    const postProductMock = jest.spyOn(services, 'updateProduct');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_DATA);

    const mockMutate = jest.spyOn(useSWR, 'mutate');

    const MockChildren = () => {
      const { onUpdateProduct } = useContext(ProductContext);
      return <button title='Submit' onClick={() => onUpdateProduct(MOCK_PRODUCT_DATA)} />;
    };

    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });

    expect(mockMutate).toHaveBeenCalledWith(`${URL_API.PRODUCTS_WITH_STATUS_TYPE}&`);
  });

  it('Should return a message if update product fails', async () => {
    const postProductMock = jest.spyOn(services, 'updateProduct');
    postProductMock.mockResolvedValue('Error');

    const MockChildren = () => {
      const { errorMessage, onUpdateProduct } = useContext(ProductContext);
      return (
        <>
          <p>{errorMessage}</p>
          <button title='Submit' onClick={() => onUpdateProduct(MOCK_PRODUCT_DATA)} />
        </>
      );
    };

    const { getByRole, getByText } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });
    const error = getByText('Error');

    expect(error).toBeInTheDocument();
  });

  it('Should update message error if have any error', async () => {
    const postProductMock = jest.spyOn(services, 'getProductsByParam');
    postProductMock.mockResolvedValue(MOCK_PRODUCT_API);

    const MockChildren = () => {
      const { errorMessage, onUpdateErrorMessage } = useContext(ProductContext);
      return (
        <>
          <p data-testid='error'>{errorMessage}</p>
          <button title='Submit' onClick={() => onUpdateErrorMessage('Error 400')} />
        </>
      );
    };

    const { getByRole, getByTestId } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    await act(() => {
      fireEvent.click(button);
    });
    const error = getByTestId('error');

    expect(error).toHaveTextContent('Error 400');
  });
});
