import { render, screen, fireEvent } from '@testing-library/react';
import { ProductRow, ProductRowProps } from '@pages';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

describe('Testing ProductRow', () => {
  const mockProduct: ProductRowProps = {
    id: '1',
    image: 'product1.jpg',
    name: 'Product 1',
    type: 'Type 1',
    typesId: '1',
    quantity: 10,
    status: 'Available',
    statusesId: '1',
    brandImage: 'brand1.jpg',
    brand: 'Brand 1',
    price: 100,
    onEdit: jest.fn(),
    onSetProductItem: jest.fn(),
    onToggleNotification: jest.fn(),
  };

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <table>
      <tbody>
        <BrowserRouter>{children}</BrowserRouter>
      </tbody>
    </table>
  );

  test('Should render product information correctly', () => {
    const mockProps = {
      ...mockProduct,
      status: '',
      type: '',
    };

    const { container } = render(
      <Wrapper>
        <ProductRow {...mockProps} />
      </Wrapper>,
    );

    expect(container).toBeInTheDocument();
  });

  test('Should render component without statuses and types', () => {
    const mockProps = {
      ...mockProduct,
      statuses: undefined,
      types: undefined,
    };

    const { container } = render(
      <Wrapper>
        <ProductRow {...mockProps} />
      </Wrapper>,
    );

    expect(container).toBeInTheDocument();
  });

  test('Should show/hide menu popup correctly on click', () => {
    render(
      <Wrapper>
        <ProductRow {...mockProduct} />
      </Wrapper>,
    );

    const moreIcon = screen.getByAltText('icon more');

    fireEvent.click(moreIcon);

    const actionMenuFirst = screen.getByTestId('action-menu');
    expect(actionMenuFirst).toBeInTheDocument();

    fireEvent.click(moreIcon);
    const actionMenuSecond = screen.queryByTestId('action-menu');
    expect(actionMenuSecond).toBeNull();
  });

  test('Should call onEdit and hides menu popup when Edit button is clicked', () => {
    render(
      <Wrapper>
        <ProductRow {...mockProduct} />
      </Wrapper>,
    );

    const moreIcon = screen.getByAltText('icon more');
    fireEvent.click(moreIcon);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockProduct.onEdit).toHaveBeenCalledTimes(1);
    expect(mockProduct.onToggleNotification).not.toHaveBeenCalled();
    expect(mockProduct.onSetProductItem).not.toHaveBeenCalled();
    expect(screen.queryByTestId('action-menu')).toBeNull();
  });

  test('Should call onToggleNotification, onSetProductItem, and hides menu popup when Delete button is clicked', () => {
    render(
      <Wrapper>
        <ProductRow {...mockProduct} />
      </Wrapper>,
    );

    const moreIcon = screen.getByAltText('icon more');
    fireEvent.click(moreIcon);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockProduct.onToggleNotification).toHaveBeenCalledTimes(1);
    expect(mockProduct.onSetProductItem).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('action-menu')).toBeNull();
  });
});
