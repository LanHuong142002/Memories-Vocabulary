import { fireEvent, render } from '@testing-library/react';
import { DetailsPage } from '@pages';
import { act } from 'react-dom/test-utils';
import { MOCK_PRODUCT_API } from '@constants';
import { BrowserRouter } from 'react-router-dom';
import { ProductContext, ProductContextType } from '@contexts';
import { ReactNode } from 'react';

const mockProductContext = {
  errorMessage: 'error',
  products: MOCK_PRODUCT_API,
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: jest.fn(),
  onSearchProducts: jest.fn(),
  onUpdateErrorMessage: jest.fn(),
};

const MockProvider = ({
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

describe('Testing Details Page', () => {
  it('Should render component correctly', async () => {
    const { container } = await act(async () =>
      render(
        <MockProvider>
          <DetailsPage />
        </MockProvider>,
      ),
    );

    expect(container).toBeInTheDocument();
  });

  it('Should set the product state correctly', async () => {
    const { container } = await act(async () =>
      render(
        <MockProvider>
          <DetailsPage />
        </MockProvider>,
      ),
    );

    const input = container.querySelector('input[name="name"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, {
        target: { value: 'full name' },
      });
    });

    expect(input.value).toBe('full name');
  });

  it('Should render notification when have error and after that click button close to close', async () => {
    const { getByText } = await act(async () =>
      render(
        <MockProvider>
          <DetailsPage />
        </MockProvider>,
      ),
    );

    const button = getByText('Close');
    const notification = getByText('Ooops!');

    act(() => {
      fireEvent.click(button);
    });

    expect(notification).not.toBeInTheDocument();
  });
});
