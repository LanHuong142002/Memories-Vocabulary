import { fireEvent, render } from '@testing-library/react';

// Constants
import { INPUT_VARIANT } from '@constants';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { Input } from '@components';

describe('Test input component', () => {
  const handleChange = jest.fn();

  const defaultProps = {
    placeholder: 'Enter name...',
    value: 'name',
    name: 'input',
    onChange: handleChange,
  };

  it('Should render input default', () => {
    const { container } = render(<Input {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render input component without error', () => {
    const { container } = render(<Input variant={INPUT_VARIANT.SECONDARY} {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render input secondary component with error', () => {
    const { getByText } = render(
      <Input variant={INPUT_VARIANT.SECONDARY} errors={['errors']} {...defaultProps} />,
    );

    expect(getByText('errors')).toBeInTheDocument();
  });

  it('Should render input tertiary component with error', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Input variant={INPUT_VARIANT.TERTIARY} errors={['errors']} {...defaultProps} />
      </ThemeProvider>,
    );

    expect(getByText('errors')).toBeInTheDocument();
  });

  it('should call the onChange function when the input value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input variant={INPUT_VARIANT.PRIMARY} {...defaultProps} onChange={handleChange} />,
    );

    const inputElement = getByPlaceholderText('Enter name...');
    fireEvent.change(inputElement, { target: { value: 'Text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange function when the input secondary value changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        variant={INPUT_VARIANT.PRIMARY}
        errors={[]}
        {...defaultProps}
        onChange={handleChange}
      />,
    );

    const inputElement = getByPlaceholderText('Enter name...');
    fireEvent.change(inputElement, { target: { value: 'Text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
