import { fireEvent, render } from '@testing-library/react';
import Modal from '..';
import { Button } from '@components';
import { ThemeProvider } from '@contexts';

describe('Test Modal component', () => {
  const handleOnClick = jest.fn();
  const handleCloseModal = jest.fn();
  const defaultProps = {
    opened: true,
    onClose: jest.fn(),
  };

  it('Should render Modal component', () => {
    const { getByText, container } = render(
      <ThemeProvider>
        <Modal {...defaultProps} title='lorem' description='description' onClose={handleCloseModal}>
          <Button onClick={handleOnClick}>Click</Button>
        </Modal>
        ,
      </ThemeProvider>,
    );

    expect(getByText('lorem')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
  });

  it('Should call onclick when click buttons', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Modal {...defaultProps} title='lorem' description='description' onClose={handleCloseModal}>
          <Button onClick={handleOnClick}>Click</Button>
        </Modal>
        ,
      </ThemeProvider>,
    );
    const button = getByText('Click');

    fireEvent.click(button);

    expect(handleOnClick).toBeCalled();
  });
});
