import { memo } from 'react';

// Interfaces
import { VocabularyResult } from '@interfaces';

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
        <TableCell color={isSuccess ? 'success' : 'failed'}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
        <TableCell color={isSuccess ? 'success' : 'failed'}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
      </TableRow>
    </>
  ),
);

export default TableRowResult;
