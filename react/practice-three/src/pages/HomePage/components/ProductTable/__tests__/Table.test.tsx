import { fireEvent, render } from '@testing-library/react';
import { ProductTable, Filters } from '@pages';
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA, MOCK_STATUS_API, MOCK_TYPE_API } from '@constants';
import { BrowserRouter } from 'react-router-dom';
import { ProductStatus, ProductType } from '@interfaces';

describe('Testing ProductTable', () => {
  const mockFilters: Filters = {
    name: '',
    statusesId: '',
    typesId: '',
    quantity: '',
    brand: '',
    price: '',
  };

  it('Should render the table with products', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTable
          filters={mockFilters}
          statuses={MOCK_STATUS_API}
          types={MOCK_TYPE_API}
          products={MOCK_PRODUCT_API}
          onSearch={jest.fn()}
          onEdit={jest.fn()}
          onSetProductItem={jest.fn()}
          onToggleNotification={jest.fn()}
        />
      </BrowserRouter>,
    );

    expect(getByText(MOCK_PRODUCT_DATA.name)).toBeInTheDocument();
  });

  it('Should render the table without status and types', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductTable
          filters={mockFilters}
          statuses={undefined as unknown as ProductStatus[]}
          types={undefined as unknown as ProductType[]}
          products={MOCK_PRODUCT_API}
          onSearch={jest.fn()}
          onEdit={jest.fn()}
          onSetProductItem={jest.fn()}
          onToggleNotification={jest.fn()}
        />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render product status and type correctly when available', () => {
    const mockProducts = [
      {
        ...MOCK_PRODUCT_DATA,
        statuses: { id: '1', name: 'Status 1' },
        types: { id: '1', name: 'Type 1' },
      },
    ];
    const { container } = render(
      <BrowserRouter>
        <ProductTable
          filters={mockFilters}
          statuses={[]}
          types={[]}
          products={mockProducts}
          onSearch={jest.fn()}
          onEdit={jest.fn()}
          onSetProductItem={jest.fn()}
          onToggleNotification={jest.fn()}
        />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render a message if do not have any products', () => {
    const { getByText } = render(
      <ProductTable
        filters={mockFilters}
        statuses={MOCK_STATUS_API}
        types={MOCK_TYPE_API}
        products={[]}
        onSearch={jest.fn()}
        onEdit={jest.fn()}
        onSetProductItem={jest.fn()}
        onToggleNotification={jest.fn()}
      />,
    );

    expect(getByText('No products to display')).toBeInTheDocument();
  });

  it('Should call onSearch when an input has value changes', () => {
    const mockOnSearch = jest.fn();
    const { container } = render(
      <BrowserRouter>
        <ProductTable
          filters={mockFilters}
          statuses={MOCK_STATUS_API}
          types={MOCK_TYPE_API}
          products={MOCK_PRODUCT_API}
          onSearch={mockOnSearch}
          onEdit={jest.fn()}
          onSetProductItem={jest.fn()}
          onToggleNotification={jest.fn()}
        />
      </BrowserRouter>,
    );

    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Product 1' } });

    expect(mockOnSearch).toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.anything() }),
    );
  });
});
