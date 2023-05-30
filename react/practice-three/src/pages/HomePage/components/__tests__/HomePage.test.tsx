import { fireEvent, render } from '@testing-library/react';
import { HomePage } from '@pages';
import { act } from 'react-dom/test-utils';
import { MockContext } from '@helpers';

describe('HomePage', () => {
  it('Should render NotificationModal when have error and click Close button', () => {
    const { getByText } = render(
      <MockContext>
        <HomePage />
      </MockContext>,
    );
    const notificationModal = getByText('Close');
    const notificationModalText = getByText('Ooops!');
    act(() => {
      fireEvent.click(notificationModal);
    });

    expect(notificationModalText).not.toBeInTheDocument();
  });

  it('Should render confirm modal when click button delete in action menu and click button confirm delete', () => {
    const { getByText, getByAltText, getByRole } = render(
      <MockContext>
        <HomePage />
      </MockContext>,
    );

    const icon = getByAltText('icon more');
    act(() => {
      fireEvent.click(icon);
    });

    const buttonOpenNotification = getByRole('button', {
      name: 'Delete',
    });
    expect(buttonOpenNotification).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonOpenNotification);
    });

    const button = getByRole('button', {
      name: 'Delete',
    });
    const confirmModal = getByText('Delete product');
    act(() => {
      fireEvent.click(button);
    });

    expect(confirmModal).not.toBeInTheDocument();
  });

  it('Should render product modal when click button edit in action menu and click button submit', () => {
    const { getByText, getByAltText, getByRole } = render(
      <MockContext>
        <HomePage />
      </MockContext>,
    );

    const icon = getByAltText('icon more');
    act(() => {
      fireEvent.click(icon);
    });

    const buttonOpenProductModal = getByRole('button', {
      name: 'Edit',
    });
    expect(buttonOpenProductModal).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonOpenProductModal);
    });

    const button = getByRole('button', {
      name: 'Confirm',
    });
    const productModal = getByText('Product information');
    act(() => {
      fireEvent.click(button);
    });

    expect(productModal).not.toBeInTheDocument();
  });

  it('Should render new product modal when click button add new product, type in input and click confirm button ', () => {
    const { getByRole, getByPlaceholderText } = render(
      <MockContext>
        <HomePage />
      </MockContext>,
    );

    const buttonOpenAddNewProductModal = getByRole('button', {
      name: 'Add New Product',
    });
    act(() => {
      fireEvent.click(buttonOpenAddNewProductModal);
    });

    const button = getByRole('button', {
      name: 'Cancel',
    });
    const input = getByPlaceholderText('Enter name...') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'lorem' } });
      fireEvent.click(button);
    });

    expect(input).not.toBeInTheDocument();
  });
});
