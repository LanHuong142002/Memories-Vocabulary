import { memo } from 'react';

// Interfaces
import { VocabularyResult } from '@interfaces';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

// Components
import { TableCell, TableRow } from '@components';

interface TableRowResultProps extends VocabularyResult {
  order: string;
}

const TableRowResult = memo(
  ({ isSuccess, order, english, vietnamese, answer }: TableRowResultProps) => (
    <>
      <TableRow>
        <TableCell>{order}</TableCell>
        <TableCell>{english}</TableCell>
        <TableCell>{vietnamese}</TableCell>
        <TableCell>{answer}</TableCell>
        <TableCell color={isSuccess ? TABLE_CELL_COLOR.SUCCESS : TABLE_CELL_COLOR.FAILED}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
        <TableCell color={isSuccess ? TABLE_CELL_COLOR.SUCCESS : TABLE_CELL_COLOR.FAILED}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
      </TableRow>
    </>
  ),
);

export default TableRowResult;
