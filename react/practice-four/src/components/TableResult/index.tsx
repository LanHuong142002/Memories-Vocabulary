import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { Table, TableBody, TableCell, TableHeader, TableRow, TableRowResult } from '@components';

// Styles
import './index.css';

interface TableResultProps {
  result: VocabularyResult[];
}

const TableResult = memo(({ result }: TableResultProps) => (
  <Table className='result' hasBorderCell={true}>
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
      {result.map(({ id, answer, english, vietnamese }, index) => (
        <TableRowResult
          id={id}
          key={`table-result-${uuidv4()}`}
          order={`${index + 1}`}
          answer={answer}
          isSuccess={!!(answer === vietnamese)}
          english={english}
          vietnamese={vietnamese}
        />
      ))}
    </TableBody>
  </Table>
));

export default TableResult;
