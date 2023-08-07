// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@components';

export interface TableResultProps {
  theme?: 'light' | 'dark';
  result: VocabularyResult[];
}

export const TableResult = ({ result, theme = 'light' }: TableResultProps) => (
  <Table theme={theme} hasBorderCell={true}>
    <TableHeader>
      <TableRow>
        <TableCell tagName='th' rowspan={2}>
          No.
        </TableCell>
        <TableCell>English</TableCell>
        <TableCell tagName='th' colspan={2}>
          Vietnamese
        </TableCell>
        <TableCell tagName='th' rowspan={2}>
          Result
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell tagName='th'>Native</TableCell>
        <TableCell tagName='th'>Translation</TableCell>
        <TableCell tagName='th'>Answer</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {result.map((item) => (
        <>
          <TableRow>
            <TableCell tagName='td' rowspan={2}>
              {item.no}
            </TableCell>
            <TableCell tagName='td' rowspan={2}>
              {item.native}
            </TableCell>
            <TableCell tagName='td'>{item.translation}</TableCell>
            <TableCell tagName='td'>{item.answer}</TableCell>
            <TableCell tagName='td' rowspan={2} color={item.isSuccess ? 'success' : 'failed'}>
              {item.isSuccess ? '\u2714' : '\u2718'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell tagName='td' colspan={2} color={item.isSuccess ? 'success' : 'failed'}>
              {item.isSuccess ? '\u2714' : '\u2718'}
            </TableCell>
          </TableRow>
        </>
      ))}
    </TableBody>
  </Table>
);
