import { fireEvent, render } from '@testing-library/react';

// Components
import { ToggleTheme } from '@components';

describe('Test toggle theme component', () => {
  const handleOnChange = jest.fn();

  it('Should render toggle light', () => {
    const { container } = render(<ToggleTheme isChecked={true} onChange={handleOnChange} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render toggle dark', () => {
    const { container } = render(<ToggleTheme isChecked={false} onChange={handleOnChange} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call function onChange when click toggle component', () => {
    const handleOnChange = jest.fn();
    const { getByRole } = render(<ToggleTheme isChecked={true} onChange={handleOnChange} />);

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleOnChange).toBeCalled();
  });
});
