import { ReactElement, ReactNode, memo } from 'react';
import { Box, MantineTheme } from '@mantine/core';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

interface TableCellProps {
  color?: TABLE_CELL_COLOR;
  children: ReactNode;
}

const TableCell = memo(
  ({ color, children }: TableCellProps): ReactElement => (
    <Box
      className='cell'
      data-testid='table-cell'
      sx={(theme: MantineTheme) => ({
        minWidth: '70px',
        boxSizing: 'border-box',
        padding: '8px 2px',
        lineBreak: 'anywhere',
        backgroundColor:
          color === TABLE_CELL_COLOR.SUCCESS
            ? theme.colors.green[0]
            : color === TABLE_CELL_COLOR.FAILED
            ? theme.colors.red[0]
            : theme.colors.none[0],
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          minWidth: '85px',
        },
      })}
    >
      {children}
    </Box>
  ),
);

export default TableCell;
