import { memo } from 'react';

// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { TableCell, TableRow } from '@components';

interface TableRowResultProps extends VocabularyResult {
  order: number;
}

const TableRowResult = memo(
  ({ isSuccess, order, native, translation, answer }: TableRowResultProps) => (
    <>
      <TableRow>
        <TableCell tagName='td' rowspan={2}>
          {order}
        </TableCell>
        <TableCell tagName='td' rowspan={2}>
          {native}
        </TableCell>
        <TableCell tagName='td'>{translation}</TableCell>
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
