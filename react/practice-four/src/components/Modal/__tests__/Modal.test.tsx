import { fireEvent, render } from '@testing-library/react';
import Modal from '..';
import { Button } from '@components';

describe('Test Modal component', () => {
  const handleOnClick = jest.fn();
  const handleCloseModal = jest.fn();

  it('Should render Modal component', () => {
    const { getByText, container } = render(
      <Modal title='lorem' description='description' onCloseModal={handleCloseModal}>
        <Button onClick={handleOnClick}>Click</Button>
      </Modal>,
    );

    expect(getByText('lorem')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
  });

  it('Should call onclick when click buttons', () => {
    const { getByRole, getByText } = render(
      <Modal title='lorem' description='description' onCloseModal={handleCloseModal}>
        <Button onClick={handleOnClick}>Click</Button>
      </Modal>,
    );

    const buttonClose = getByRole('button', {
      name: /χ/i,
    });
    const button = getByText('Click');

    fireEvent.click(buttonClose);
    fireEvent.click(button);

    expect(handleOnClick).toBeCalled();
  });
});
