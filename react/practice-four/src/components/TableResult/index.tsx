// Interfaces
import { VocabularyResult } from '@interfaces';

import { memo } from 'react';

// Components
import { Table, TableBody, TableCell, TableHeader, TableRow, TableRowResult } from '@components';

export interface TableResultProps {
  theme?: 'light' | 'dark';
  result: VocabularyResult[];
}

export const TableResult = memo(({ result, theme = 'light' }: TableResultProps) => (
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
      {result.map((item, index) => (
        <TableRowResult
          key={`table-result-${index}`}
          index={index + 1}
          answer={item.answer}
          isSuccess={item.isSuccess}
          native={item.native}
          translation={item.translation}
        />
      ))}
    </TableBody>
  </Table>
));
