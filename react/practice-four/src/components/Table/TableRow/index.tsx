import { Box, MantineTheme } from '@mantine/core';
import { ReactElement, ReactNode, memo } from 'react';

// Helpers
import { getColorScheme } from '@helpers';

const TableRow = memo(
  ({ children }: { children: ReactNode }): ReactElement => (
    <Box
      className='row'
      data-testid='table-row'
      sx={(theme: MantineTheme) => ({
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
      })}
    >
      {children}
    </Box>
  ),
);

export default TableRow;
