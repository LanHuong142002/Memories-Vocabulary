import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { Button, TableCell, TableRow } from '@components';

interface TableRowVocabularyProps extends Vocabulary {
  order: number;
  onClick: (id: string) => void;
}

const TableRowVocabulary = memo(
  ({ order, id, english, vietnamese, onClick }: TableRowVocabularyProps) => {
    const handleOnClick = () => {
      onClick(id!);
    };

    return (
      <TableRow>
        <TableCell tagName='td'>{order}</TableCell>
        <TableCell tagName='td'>{english}</TableCell>
        <TableCell tagName='td'>{vietnamese}</TableCell>
        <TableCell tagName='td'>
          <Button variant='secondary' onClick={handleOnClick}>
            X
          </Button>
        </TableCell>
      </TableRow>
    );
  },
);

export default TableRowVocabulary;
