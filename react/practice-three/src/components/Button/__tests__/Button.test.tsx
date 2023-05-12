import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps } from '@components';

describe('Testing button component', () => {
  const handleClick = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    label: 'Cancel',
    variant: 'primary',
    size: 'lg',
    onClick: handleClick,
  } as ButtonProps;

  it('Should render Button', () => {
    const { container } = render(<Button {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call click event when click button', () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledTimes(1);
  });

  it('Should render default button correctly', () => {
    render(<Button label='Cancel' />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-color-default');
    expect(button).toHaveTextContent('Cancel');
  });

  it('Should render button with disabled correctly', () => {
    render(<Button label={'Cancel'} isDisabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveClass('btn-disabled');
  });

  it('Should render button with loading correctly', () => {
    render(<Button label={'Cancel'} isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveClass('btn-loading');
  });
});
