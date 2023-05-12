import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Input, InputProps } from '@components';

describe('Testing Input component', () => {
  const handleChange = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    name: 'name',
    placeholder: 'Enter name...',
  } as InputProps;

  it('Should render Input component', () => {
    const { container } = render(<Input {...defaultProps} onChange={handleChange} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call onChange event when change value input', () => {
    render(<Input {...defaultProps} onChange={handleChange} />);

    const input = screen.getByPlaceholderText<HTMLInputElement>('Enter name...');

    act(() => {
      fireEvent.change(input, {
        target: { value: 'full name' },
      });
    });

    expect(handleChange).toBeCalled();
    expect(input).toHaveValue('full name');
  });

  it('Should render component with title correctly', () => {
    const { container } = render(
      <Input {...defaultProps} title='Full Name' onChange={handleChange} />,
    );

    expect(container.querySelector('.text-wrapper label')).toBeInTheDocument();
    expect(container.querySelector('.text-wrapper label')).toHaveTextContent('Full Name');
  });
});
