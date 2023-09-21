import { cleanup, fireEvent } from '@testing-library/react';
import { useMantineColorScheme } from '@mantine/core';

// Components
import { ToggleTheme } from '@components';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.mock('@helpers', () => ({
  __esModule: true,
  ...jest.requireActual('@helpers'),
  getItems: jest.fn().mockReturnValueOnce('dark').mockReturnValueOnce('light'),
}));

describe('Test ThemeProvider', () => {
  afterEach(() => {
    cleanup();
  });

  const Component = () => {
    const { colorScheme } = useMantineColorScheme();

    return (
      <div>
        <p>{colorScheme}</p>
        <ToggleTheme />
      </div>
    );
  };

  it('Should render dark when click toggle button', () => {
    const { getByText } = renderWithThemeProvider(<Component />);

    expect(getByText('dark')).toBeInTheDocument();
  });

  it('Should render light when click toggle button twice', () => {
    const { getByRole, getByText } = renderWithThemeProvider(<Component />);
    const button = getByRole('button') as HTMLInputElement;

    fireEvent.click(button);

    expect(getByText('dark')).toBeInTheDocument();
  });
});
