import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps } from '@components';

describe('Testing button component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    label: 'Cancel',
    variant: 'primary',
    size: 'lg',
  } as ButtonProps;

  it('Should render Button', () => {
    const { container } = render(<Button {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call click event when click button', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledTimes(1);
  });

  it('Should render default button correctly', () => {
    render(<Button label='Cancel' />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('Should render button with disabled correctly', () => {
    const handleClick = jest.fn();
    render(<Button label='Cancel' isDisabled={true} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toBeCalled();
  });

  it('Should render button with loading correctly', () => {
    const handleClick = jest.fn();
    render(<Button label='Loading' isLoading={true} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveAttribute('disabled');
    expect(handleClick).not.toBeCalled();
  });
});
