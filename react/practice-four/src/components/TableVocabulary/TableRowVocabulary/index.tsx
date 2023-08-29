import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { Button, Spinner, TableCell, TableRow } from '@components';

interface TableRowVocabularyProps extends Vocabulary {
  isLoading: boolean;
  order: number;
  onClick: (id: string) => void;
}

const TableRowVocabulary = memo(
  ({ isLoading, order, id, english, vietnamese, onClick }: TableRowVocabularyProps) => {
    const handleOnClick = () => {
      onClick(id!);
    };

    return (
      <TableRow>
        {isLoading ? (
          <TableCell className='cell-loading' colspan={4}>
            <Spinner size='s' />
          </TableCell>
        ) : (
          <>
            <TableCell tagName='td'>{order}</TableCell>
            <TableCell tagName='td'>{english}</TableCell>
            <TableCell tagName='td'>{vietnamese}</TableCell>
            <TableCell tagName='td'>
              <Button variant='secondary' onClick={handleOnClick}>
                X
              </Button>
            </TableCell>
          </>
        )}
      </TableRow>
    );
  },
);

export default TableRowVocabulary;
