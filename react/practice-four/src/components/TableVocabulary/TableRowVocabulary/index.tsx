import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Constants
import { BUTTON_VARIANT, SPINNER_SIZE } from '@constants';

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
          <TableCell className='cell-loading'>
            <Spinner size={SPINNER_SIZE.S} />
          </TableCell>
        ) : (
          <>
            <TableCell>{order}</TableCell>
            <TableCell>{english}</TableCell>
            <TableCell>{vietnamese}</TableCell>
            <TableCell>
              <Button variant={BUTTON_VARIANT.SECONDARY} onClick={handleOnClick}>
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
