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

export const TableVocabulary = memo(({ vocabularies, onClick }: TableVocabularyProps) => (
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
      {vocabularies.map((vocab) => (
        <TableRowVocabulary
          key={`table-vocabulary-${vocab.id}`}
          english={vocab.english}
          vietnamese={vocab.vietnamese}
          id={vocab.id}
          onClick={onClick}
        />
      ))}
    </TableBody>
  </Table>
));
