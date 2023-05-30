import { fireEvent, render } from '@testing-library/react';
import { ProductContext, ProductProvider } from '@contexts';
import { useContext } from 'react';
import { MOCK_PRODUCT_DATA } from '@constants';
import { act } from 'react-test-renderer';

jest.mock('@services', () => ({
  ...jest.requireActual('@services'),
  postProduct: jest
    .fn()
    .mockResolvedValue({})
    .mockImplementationOnce(() => {
      return 'Error';
    }),
  deleteProduct: jest
    .fn()
    .mockResolvedValue({})
    .mockImplementationOnce(() => {
      return 'Error';
    }),
  updateProduct: jest
    .fn()
    .mockResolvedValue({})
    .mockImplementationOnce(() => {
      return 'Error';
    }),
}));

describe('Testing Product Context', () => {
  const mockFN = jest.fn((callback) => callback);

  it('Should call function onSearchProducts when click the button', () => {
    const MockChildren = () => {
      const { onSearchProducts } = useContext(ProductContext);
      return <button onClick={() => mockFN(onSearchProducts('&name=123'))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onAddProduct and set state after clicking button', () => {
    const MockChildren = () => {
      const { onAddProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(onAddProduct(MOCK_PRODUCT_DATA))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onAddProduct after clicking button', () => {
    const MockChildren = () => {
      const { onAddProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(onAddProduct(MOCK_PRODUCT_DATA))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onDeleteProduct and set state after clicking button', () => {
    const MockChildren = () => {
      const { onDeleteProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(onDeleteProduct('123'))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onDeleteProduct after clicking button', () => {
    const MockChildren = () => {
      const { onDeleteProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(act(() => onDeleteProduct('123')))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onUpdateProduct and set state after clicking button', () => {
    const MockChildren = () => {
      const { onUpdateProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(onUpdateProduct(MOCK_PRODUCT_DATA))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onUpdateProduct after clicking button', () => {
    const MockChildren = () => {
      const { onUpdateProduct } = useContext(ProductContext);
      return <button onClick={() => mockFN(onUpdateProduct(MOCK_PRODUCT_DATA))} />;
    };
    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });

  it('Should call function onUpdateErrorMessage when click the button', () => {
    const MockChildren = () => {
      const { onUpdateErrorMessage } = useContext(ProductContext);
      return <button onClick={() => mockFN(onUpdateErrorMessage('Error'))} />;
    };

    const { getByRole } = render(
      <ProductProvider>
        <MockChildren />
      </ProductProvider>,
    );

    const button = getByRole('button');
    expect(button).toBeDefined();

    act(() => {
      fireEvent.click(button);
    });

    expect(mockFN).toHaveBeenCalled();
  });
});
