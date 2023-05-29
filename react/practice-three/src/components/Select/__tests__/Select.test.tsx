import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MOCK_TYPE_API } from '@constants';
import { Select } from '@components';

describe('Testing Select component', () => {
  const handleChange = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    valueSelected: 'type',
    name: 'type',
    options: MOCK_TYPE_API,
    onChange: handleChange,
  };

  it('Should render Select component', () => {
    const { container } = render(<Select {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should render without title and optionAll', () => {
    render(<Select {...defaultProps} title='Full Name' />);

    const select = screen.getByTestId('select-box');

    expect(select).toMatchSnapshot();
  });

  it('should render select with optionAll correctly', () => {
    render(<Select {...defaultProps} optionAll={true} />);

    const select = screen.getByTestId('select-box');
    const optionAll = screen.getByDisplayValue('All');

    expect(select).toBeInTheDocument();
    expect(optionAll).toBeInTheDocument();
  });

  it('should call onChange when an option is selected', () => {
    const { getByDisplayValue } = render(<Select {...defaultProps} />);
    const select = getByDisplayValue('Bracelet');

    fireEvent.change(select, { target: { value: 'e76918cc-89fe-4329-99e5-63b939df3306' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
