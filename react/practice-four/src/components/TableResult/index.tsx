// Interfaces
import { VocabularyResult } from '@interfaces';

import { memo } from 'react';

// Components
import { Table, TableBody, TableCell, TableHeader, TableRow, TableRowResult } from '@components';

interface TableResultProps {
  result: VocabularyResult[];
}

const TableResult = memo(({ result }: TableResultProps) => (
  <Table hasBorderCell={true}>
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
      {result.map(({ answer, isSuccess, native, translation }, index) => (
        <TableRowResult
          key={`table-result-${index}`}
          order={index + 1}
          answer={answer}
          isSuccess={isSuccess}
          native={native}
          translation={translation}
        />
      ))}
    </TableBody>
  </Table>
));

export default TableResult;
