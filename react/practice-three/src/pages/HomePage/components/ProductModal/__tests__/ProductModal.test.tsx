import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductModal } from '@pages';
import { MOCK_PRODUCT_DATA, MOCK_STATUS_API, MOCK_TYPE_API } from '@constants';
import { act } from 'react-dom/test-utils';
import { ProductStatus, ProductType } from '@interfaces';

jest.mock('@helpers', () => ({
  convertBase64: jest.fn().mockResolvedValue('image test'),
  validateNumberField: jest.fn(),
  validateStringField: jest.fn(),
  loadImage: jest.fn(),
}));

describe('ProductModal', () => {
  const mockOnToggleProductModal = jest.fn();
  const mockOnConfirm = jest.fn();

  test('Should product modal correctly', () => {
    const { container } = render(
      <ProductModal
        titleModal='Product Modal'
        productItem={MOCK_PRODUCT_DATA}
        statuses={MOCK_STATUS_API}
        types={MOCK_TYPE_API}
        onToggleProductModal={mockOnToggleProductModal}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(container).toBeInTheDocument();
  });

  test('Should render product modal without statuses and types', () => {
    const { container } = render(
      <ProductModal
        titleModal='Product Modal'
        productItem={MOCK_PRODUCT_DATA}
        statuses={undefined as unknown as ProductStatus[]}
        types={undefined as unknown as ProductType[]}
        onToggleProductModal={mockOnToggleProductModal}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(container).toBeInTheDocument();
  });

  test('Should update product fields when input value changes', () => {
    const { container, getByPlaceholderText } = render(
      <ProductModal
        titleModal='Product Modal'
        productItem={MOCK_PRODUCT_DATA}
        statuses={MOCK_STATUS_API}
        types={MOCK_TYPE_API}
        onToggleProductModal={mockOnToggleProductModal}
        onConfirm={mockOnConfirm}
      />,
    );

    const productQuantity = getByPlaceholderText('Enter quantity...') as HTMLInputElement;
    const productPrice = container.querySelector('input[name="price"]') as HTMLInputElement;
    const productName = container.querySelector('input[name="name"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(productQuantity, { target: { value: '200' } });
      fireEvent.change(productName, { target: { value: 'lorem' } });
      fireEvent.change(productPrice, { target: { value: '30000' } });
    });

    expect(productQuantity.value).toBe('200');
    expect(productPrice.value).toBe('30000');
    expect(productName.value).toBe('lorem');
  });

  test('Should update product file when input file value changes', async () => {
    const { container } = render(
      <ProductModal
        titleModal='Product Modal'
        productItem={MOCK_PRODUCT_DATA}
        statuses={MOCK_STATUS_API}
        types={MOCK_TYPE_API}
        onToggleProductModal={mockOnToggleProductModal}
        onConfirm={mockOnConfirm}
      />,
    );

    const inputFile = container.querySelector('input[name="image"]') as HTMLInputElement;
    const file = new File(['dummy content'], 'dummy.jpg', { type: 'image/jpeg' });
    Object.defineProperty(inputFile, 'files', {
      value: [file],
    });

    fireEvent.change(inputFile);

    await waitFor(() => {
      expect(inputFile.files).toHaveLength(1);
      expect(inputFile.files![0]).toStrictEqual(file);
      expect(mockOnToggleProductModal).not.toHaveBeenCalled();
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });

  test('Should call onConfirm and onToggleProductModal when form is submitted', () => {
    render(
      <ProductModal
        titleModal='Product Modal'
        productItem={MOCK_PRODUCT_DATA}
        statuses={MOCK_STATUS_API}
        types={MOCK_TYPE_API}
        onToggleProductModal={mockOnToggleProductModal}
        onConfirm={mockOnConfirm}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnToggleProductModal).toHaveBeenCalledTimes(1);
  });
});
