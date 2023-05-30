import { fireEvent, render } from '@testing-library/react';
import { HomeBody } from '@pages';
import { MOCK_STATUS_API, MOCK_TYPE_API } from '@constants';
import { Product, ProductStatus, ProductType } from '@interfaces';
import { act } from 'react-dom/test-utils';
import { MockProvider, mockProductContext } from '@helpers';

describe('Testing HomeBody', () => {
  const mockOnDataModal = jest.fn();
  const mockOnProductItem = jest.fn();
  const mockOnToggleNotificationModal = jest.fn();

  it('Should render the component correctly and type in input to filter', () => {
    const { container } = render(
      <MockProvider>
        <HomeBody
          statuses={MOCK_STATUS_API}
          types={MOCK_TYPE_API}
          onDataModal={mockOnDataModal}
          onProductItem={mockOnProductItem}
          onToggleNotificationModal={mockOnToggleNotificationModal}
        />
      </MockProvider>,
    );

    const input = container.querySelector('input[name="name"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'lorem' } });
    });

    expect(input.value).toBe('lorem');
  });

  it('Should render the component without products, status and types', () => {
    const value = {
      ...mockProductContext,
      products: undefined as unknown as Product[],
    };

    const { container } = render(
      <MockProvider value={value}>
        <HomeBody
          statuses={undefined as unknown as ProductStatus[]}
          types={undefined as unknown as ProductType[]}
          onDataModal={mockOnDataModal}
          onProductItem={mockOnProductItem}
          onToggleNotificationModal={mockOnToggleNotificationModal}
        />
      </MockProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
