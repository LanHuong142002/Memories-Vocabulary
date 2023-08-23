import { fireEvent, render, cleanup } from '@testing-library/react';
import { ChangeEvent, useCallback, useContext, useState } from 'react';

// Components
import { ToggleTheme } from '@components';

// Contexts
import { ThemeContext, ThemeProvider } from '@contexts';

// Helpers
import * as helpers from '@helpers';

jest.mock('@helpers', () => ({ __esModule: true, ...jest.requireActual('@helpers') }));

describe('Test ThemeProvider', () => {
  afterEach(() => {
    cleanup();
  });

  const Component = () => {
    const { onToggleTheme, theme } = useContext(ThemeContext);
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggleTheme = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.currentTarget;
        setToggle(checked);
        onToggleTheme(checked);
      },
      [onToggleTheme],
    );

    return (
      <div>
        <p>{theme}</p>
        <ToggleTheme isChecked={toggle} onChange={handleToggleTheme} />
      </div>
    );
  };

  it('Should render dark when click toggle button', () => {
    jest.spyOn(helpers, 'getItems').mockReturnValue('light');
    const { getByRole, getByText } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(getByText('dark')).toBeInTheDocument();
  });

  it('Should render light when click toggle button twice', () => {
    const { getByRole, getByText } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(getByText('light')).toBeInTheDocument();
  });
});
