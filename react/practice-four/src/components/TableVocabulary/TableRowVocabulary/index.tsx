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
          <TableCell className='cell-loading' colspan={4}>
            <Spinner size={SPINNER_SIZE.S} />
          </TableCell>
        ) : (
          <>
            <TableCell tagName='td'>{order}</TableCell>
            <TableCell tagName='td'>{english}</TableCell>
            <TableCell tagName='td'>{vietnamese}</TableCell>
            <TableCell tagName='td'>
              <Button
                variant={BUTTON_VARIANT.SECONDARY}
                onClick={handleOnClick}
                dataTestId='button-delete-vocabulary'
              >
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
