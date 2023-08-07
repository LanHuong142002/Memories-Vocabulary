import { Button, TableCell, TableRow } from '@components';
import { Vocabulary } from '@interfaces';

export interface TableRowVocabularyProps extends Vocabulary {
  onClick: (id: number) => void;
}

export const TableRowVocabulary = ({
  id,
  english,
  vietnamese,
  onClick,
}: TableRowVocabularyProps) => {
  const handleOnClick = () => {
    onClick(id);
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
};
