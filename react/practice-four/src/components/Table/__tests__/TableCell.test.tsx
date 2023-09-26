import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MantineProvider, MantineTheme } from '@mantine/core';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

// Components
import { TableCell } from '@components';

describe('Test table cell component', () => {
  const theme = {
    colors: {
      red: ['red'],
      green: ['green'],
      none: ['none'],
    },
  } as unknown as MantineTheme;

  const ComponentWithMantineProvider = ({ children }: { children: ReactNode }) => (
    <MantineProvider theme={theme}>{children}</MantineProvider>
  );

  it('Should renders color red whe table cell have prop color failed', () => {
    const { container } = render(
      <ComponentWithMantineProvider>
        <TableCell color={TABLE_CELL_COLOR.FAILED}>Test</TableCell>
      </ComponentWithMantineProvider>,
    );

    expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.red[0]}`);
  });

  it('Should renders color green whe table cell have prop color success', () => {
    const { container } = render(
      <ComponentWithMantineProvider>
        <TableCell color={TABLE_CELL_COLOR.SUCCESS}>Test</TableCell>
      </ComponentWithMantineProvider>,
    );

    expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.green[0]}`);
  });

  it('Should renders color none whe table cell dont have prop color', () => {
    const { container } = render(
      <ComponentWithMantineProvider>
        <TableCell>Test</TableCell>
      </ComponentWithMantineProvider>,
    );

    expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.none[0]}`);
  });
});
