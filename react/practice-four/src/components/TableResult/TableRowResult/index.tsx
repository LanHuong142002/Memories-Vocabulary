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
        <TableCell tagName='td' rowspan={2}>
          {order}
        </TableCell>
        <TableCell tagName='td' rowspan={2}>
          {english}
        </TableCell>
        <TableCell tagName='td'>{vietnamese}</TableCell>
        <TableCell tagName='td'>{answer}</TableCell>
        <TableCell tagName='td' rowspan={2} color={isSuccess ? 'success' : 'failed'}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell tagName='td' colspan={2} color={isSuccess ? 'success' : 'failed'}>
          {isSuccess ? '\u2714' : '\u2718'}
        </TableCell>
      </TableRow>
    </>
  ),
);

export default TableRowResult;
