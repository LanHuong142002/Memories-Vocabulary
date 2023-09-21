// Helpers
import { fireEvent, renderWithThemeProvider } from '@helpers';

// Components
import { ToggleTheme } from '@components';

describe('Test toggle theme component', () => {
  it('Should render toggle light', () => {
    const { container } = renderWithThemeProvider(<ToggleTheme />);

    expect(container).toBeInTheDocument();
  });

  it('Should render toggle dark', () => {
    const { container, getByRole } = renderWithThemeProvider(<ToggleTheme />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(container).toBeInTheDocument();
  });
});
