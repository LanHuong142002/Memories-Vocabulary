import { render, fireEvent } from '@testing-library/react';
import { Modal } from '@components';

describe('Testing Modal component', () => {
  const title = 'Product Modal';
  const toggleModal = jest.fn();

  it('Should renders the title correctly', () => {
    const { getByText } = render(
      <Modal title={title} toggleModal={toggleModal}>
        Test content
      </Modal>,
    );

    expect(getByText(title)).toBeInTheDocument();
  });

  it('Should renders the children correctly', () => {
    const { getByText } = render(
      <Modal title={title} toggleModal={toggleModal}>
        Test content
      </Modal>,
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('Should calls toggleModal when click icon cancel', () => {
    const { getByRole } = render(
      <Modal title={title} toggleModal={toggleModal}>
        Test content
      </Modal>,
    );

    fireEvent.click(getByRole('img'));

    expect(toggleModal).toHaveBeenCalled();
  });

  it('Should render modal with icon correctly', () => {
    const { getByAltText } = render(
      <Modal url='/icons/cancel-icon.svg' toggleModal={toggleModal}>
        Modal content
      </Modal>,
    );
    const icon = getByAltText('icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', `${process.env.VITE_ASSETS_URL}/icons/cancel-icon.svg`);
  });
});
