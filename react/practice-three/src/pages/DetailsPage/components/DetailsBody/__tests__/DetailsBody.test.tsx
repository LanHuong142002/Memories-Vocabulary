import { act } from 'react-dom/test-utils';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

// Constants
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA, MOCK_STATUS_API, MOCK_TYPE_API } from '@constants';

// Contexts
import { ProductContext } from '@contexts';

// Components
import { DetailsBody } from '@pages';

jest.mock('@hooks', () => ({
  useStatus: jest.fn(() => {
    return { data: MOCK_STATUS_API, error: 'error' };
  }),
  useType: jest.fn(() => {
    return { data: MOCK_TYPE_API, error: 'error' };
  }),
  useProductById: jest.fn(() => {
    return { data: MOCK_PRODUCT_DATA, error: 'error' };
  }),
  useProduct: jest.fn(() => {
    return { data: MOCK_PRODUCT_API, error: '' };
  }),
  useDebounce: jest.fn(() => {
    return MOCK_PRODUCT_DATA;
  }),
}));

jest.mock('@helpers', () => ({
  convertBase64: jest.fn().mockResolvedValue('image test'),
  validateNumberField: jest.fn(),
  validateStringField: jest.fn(),
  loadImage: jest.fn(),
}));

const mockUpdateProduct = jest.fn();

const mockValue = {
  errorMessage: 'error',
  products: MOCK_PRODUCT_API,
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: mockUpdateProduct,
  onSearchProducts: jest.fn(),
  onUpdateErrorMessage: jest.fn(),
};

describe('Testing Details Body', () => {
  const handleOpenErrorModal = jest.fn();
  const handleSetProduct = jest.fn();
  const MockProvider = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <ProductContext.Provider value={mockValue}>{children}</ProductContext.Provider>
    </BrowserRouter>
  );

  it('Should render component correctly', () => {
    const { container } = render(
      <MockProvider>
        <DetailsBody
          onOpenErrorModal={handleOpenErrorModal}
          onSetProduct={handleSetProduct}
          product={MOCK_PRODUCT_DATA}
        />
      </MockProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render component without statuses and types', () => {
    const { container } = render(
      <MockProvider>
        <DetailsBody
          onOpenErrorModal={handleOpenErrorModal}
          onSetProduct={handleSetProduct}
          product={MOCK_PRODUCT_DATA}
        />
      </MockProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should call handleOnChange when input values change', async () => {
    const file = new File(['image.jpg'], 'image.jpg', { type: 'image/png' });
    const mockSetProduct = jest.fn();
    const { container, getByPlaceholderText } = render(
      <MockProvider>
        <DetailsBody
          product={MOCK_PRODUCT_DATA}
          onOpenErrorModal={jest.fn()}
          onSetProduct={mockSetProduct}
        />
      </MockProvider>,
    );

    const inputQuantity = getByPlaceholderText('Enter quantity...') as HTMLInputElement;
    const inputPrice = getByPlaceholderText('Enter price...') as HTMLInputElement;
    const inputName = getByPlaceholderText('Enter name...') as HTMLInputElement;
    const inputFile = container.querySelector('input[type="file"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputQuantity, { target: { value: '200' } });
      fireEvent.change(inputPrice, { target: { value: '200000' } });
      fireEvent.change(inputName, { target: { value: 'Lorem' } });
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    expect(mockSetProduct).toHaveBeenCalledWith(MOCK_PRODUCT_DATA);
  });

  it('Should call submit function when enter or click to button submit', () => {
    const { getByRole, getByPlaceholderText } = render(
      <MockProvider>
        <DetailsBody
          product={MOCK_PRODUCT_DATA}
          onOpenErrorModal={jest.fn()}
          onSetProduct={jest.fn()}
        />
      </MockProvider>,
    );
    const button = getByRole('button', { name: 'Save' });
    const input = getByPlaceholderText('Enter name...');

    act(() => {
      fireEvent.change(input, { target: { value: 'lorem' } });
      fireEvent.click(button);
    });

    expect(mockUpdateProduct).toBeCalledWith(MOCK_PRODUCT_DATA);
  });
});
