import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableRowVocabulary,
} from '@components';

export interface TableVocabularyProps {
  vocabularies: Vocabulary[];
  onClick: (id: number) => void;
}

const TableVocabulary = memo(({ vocabularies, onClick }: TableVocabularyProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell tagName='th'>No.</TableCell>
        <TableCell tagName='th'>English (Native)</TableCell>
        <TableCell tagName='th'>Vietnamese</TableCell>
        <TableCell tagName='th'>Action</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {vocabularies.map(({ id, english, vietnamese }) => (
        <TableRowVocabulary
          key={`table-vocabulary-${id}`}
          english={english}
          vietnamese={vietnamese}
          id={id}
          onClick={onClick}
        />
      ))}
    </TableBody>
  </Table>
));

export default TableVocabulary;
