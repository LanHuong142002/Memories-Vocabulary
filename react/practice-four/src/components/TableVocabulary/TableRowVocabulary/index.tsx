import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { Button, TableCell, TableRow } from '@components';

interface TableRowVocabularyProps extends Vocabulary {
  onClick: (id: string) => void;
}

const TableRowVocabulary = memo(({ id, english, vietnamese, onClick }: TableRowVocabularyProps) => {
  const handleOnClick = () => {
    onClick(id!);
  };

  return (
    <TableRow>
      <TableCell tagName='td'>{id}</TableCell>
      <TableCell tagName='td'>{english}</TableCell>
      <TableCell tagName='td'>{vietnamese}</TableCell>
      <TableCell tagName='td'>
        <Button variant='secondary' onClick={handleOnClick}>
          X
        </Button>
      </TableCell>
    </TableRow>
  );
});

export default TableRowVocabulary;
