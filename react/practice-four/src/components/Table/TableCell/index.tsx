import { ReactElement, ReactNode, memo } from 'react';
import { Box, MantineTheme } from '@mantine/core';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

interface TableCellProps {
  color?: TABLE_CELL_COLOR;
  children: ReactNode;
}

const TableCell = memo(({ color, children }: TableCellProps): ReactElement => {
  const getBackgroundColor = (theme: MantineTheme): string => {
    switch (color) {
      case TABLE_CELL_COLOR.SUCCESS:
        return theme.colors.green[0];
      case TABLE_CELL_COLOR.FAILED:
        return theme.colors.red[0];
      default:
        return theme.colors.none[0];
    }
  };

  return (
    <Box
      className='cell'
      data-testid='table-cell'
      sx={(theme: MantineTheme) => ({
        minWidth: '45px',
        boxSizing: 'border-box',
        padding: '8px 2px',
        lineBreak: 'anywhere',
        backgroundColor: getBackgroundColor(theme),
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          minWidth: '85px',
        },
      })}
    >
      {children}
    </Box>
  );
});

export default TableCell;
