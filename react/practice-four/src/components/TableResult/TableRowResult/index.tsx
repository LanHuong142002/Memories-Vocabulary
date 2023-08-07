// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { TableCell, TableRow } from '@components';

interface TableRowResultProps extends VocabularyResult {
  index: number;
}

export const TableRowResult = ({
  isSuccess,
  index,
  native,
  translation,
  answer,
}: TableRowResultProps) => (
  <>
    <TableRow>
      <TableCell tagName='td' rowspan={2}>
        {index + 1}
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
);
