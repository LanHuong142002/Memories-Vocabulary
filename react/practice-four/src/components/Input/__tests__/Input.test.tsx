import { fireEvent, render } from '@testing-library/react';
import { Input } from '..';

describe('Test input component', () => {
  const handleChange = jest.fn();

  const defaultProps = {
    placeholder: 'Enter name...',
    value: 'name',
    name: 'input',
    onChange: handleChange,
  };

  it('Should render input component', () => {
    const { container } = render(<Input variant='tertiary' {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render input secondary component', () => {
    const { container } = render(<Input variant='secondary' error='error' {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('should call the onChange function when the input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input variant='primary' {...defaultProps} onChange={handleChange} />,
    );

    const inputElement = getByPlaceholderText('Enter name...');
    fireEvent.change(inputElement, { target: { value: 'Text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange function when the input secondary value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input variant='primary' error='error' {...defaultProps} onChange={handleChange} />,
    );

    const inputElement = getByPlaceholderText('Enter name...');
    fireEvent.change(inputElement, { target: { value: 'Text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
