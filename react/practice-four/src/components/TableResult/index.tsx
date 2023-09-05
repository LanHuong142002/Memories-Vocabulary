import { memo } from 'react';

// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { Table, TableCell, TableRow, TableRowResult } from '@components';

// Styles
import './index.css';

interface TableResultProps {
  result: VocabularyResult[];
}

const TableResult = memo(({ result }: TableResultProps) => {
  const isSuccess = (answer: string | undefined, vietnamese: string) =>
    !!((answer || '').toLowerCase() === vietnamese.toLowerCase());

  return (
    <Table
      className='table-result'
      childrenHeader={
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>English</TableCell>
          <TableCell>Vietnamese</TableCell>
          <TableCell>Result</TableCell>
          <TableCell>Native</TableCell>
          <TableCell>Translation</TableCell>
          <TableCell>Answer</TableCell>
        </TableRow>
      }
    >
      {result.map(({ id, answer, english, vietnamese }, index) => (
        <TableRowResult
          id={id}
          key={`table-result-${id}`}
          order={`${index + 1}`}
          answer={answer}
          isSuccess={isSuccess(answer, vietnamese)}
          english={english}
          vietnamese={vietnamese}
        />
      ))}
    </Table>
  );
});

export default TableResult;
