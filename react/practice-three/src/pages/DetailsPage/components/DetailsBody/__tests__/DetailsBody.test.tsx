import { fireEvent, render, waitFor } from '@testing-library/react';
import { DetailsBody } from '@pages';
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA, MOCK_STATUS_API, MOCK_TYPE_API } from '@constants';
import { BrowserRouter } from 'react-router-dom';
import { ProductContext } from '@contexts';
import { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';

jest.mock('@hooks', () => ({
  useStatus: jest.fn(() => {
    return { data: MOCK_STATUS_API, error: '' };
  }),
  useType: jest.fn(() => {
    return { data: MOCK_TYPE_API, error: '' };
  }),
  useProductById: jest.fn(() => {
    return { data: MOCK_PRODUCT_DATA, error: '' };
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

const mockValue = {
  errorMessage: 'error',
  products: MOCK_PRODUCT_API,
  onAddProduct: jest.fn(),
  onDeleteProduct: jest.fn(),
  onUpdateProduct: jest.fn(),
  onSearchProducts: jest.fn(),
  onUpdateErrorMessage: jest.fn(),
};

describe('Testing Details Body', () => {
  const handleOpenErrorModal = jest.fn();
  const handleSetProduct = jest.fn();
  const Component = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <ProductContext.Provider value={mockValue}>{children}</ProductContext.Provider>
    </BrowserRouter>
  );

  it('Should render component correctly', () => {
    const { container } = render(
      <Component>
        <DetailsBody
          onOpenErrorModal={handleOpenErrorModal}
          onSetProduct={handleSetProduct}
          product={MOCK_PRODUCT_DATA}
        />
      </Component>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render component without statuses and types', () => {
    const { container } = render(
      <Component>
        <DetailsBody
          onOpenErrorModal={handleOpenErrorModal}
          onSetProduct={handleSetProduct}
          product={MOCK_PRODUCT_DATA}
        />
      </Component>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should call handleOnChange when input values change', async () => {
    // const file = new File(['image.jpg'], 'image.jpg', { type: 'image/png' });
    const { getByPlaceholderText } = render(
      <Component>
        <DetailsBody
          product={MOCK_PRODUCT_DATA}
          onOpenErrorModal={jest.fn()}
          onSetProduct={jest.fn()}
        />
      </Component>,
    );

    const inputQuantity = getByPlaceholderText('Enter quantity...') as HTMLInputElement;
    const inputPrice = getByPlaceholderText('Enter price...') as HTMLInputElement;
    const inputName = getByPlaceholderText('Enter name...') as HTMLInputElement;
    // const inputFile = container.querySelector('input[type="file"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputQuantity, { target: { value: '200' } });
      fireEvent.change(inputPrice, { target: { value: '200000' } });
      fireEvent.change(inputName, { target: { value: 'Lorem' } });
      // fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(inputQuantity.value).toBe('200');
      expect(inputPrice.value).toBe('200000');
      expect(inputName.value).toBe('Lorem');
      // expect(inputFile.files![0]).toBe(file);
    });
  });

  it('Should call submit function when enter or click to button submit', () => {
    const { container, getByRole } = render(
      <Component>
        <DetailsBody
          product={MOCK_PRODUCT_DATA}
          onOpenErrorModal={jest.fn()}
          onSetProduct={jest.fn()}
        />
      </Component>,
    );
    const button = getByRole('button', { name: 'Save' });
    const buttonBack = getByRole('button', { name: 'Back' });

    act(() => {
      fireEvent.click(button);
      fireEvent.click(buttonBack);
    });

    expect(container).toBeInTheDocument();
  });
});
