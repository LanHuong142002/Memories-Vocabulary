import { memo } from 'react';
import { Loader } from '@mantine/core';

// Interfaces
import { Vocabulary } from '@interfaces';

// Constants
import { BUTTON_VARIANT } from '@constants';

// Components
import { Button, TableCell, TableRow } from '@components';

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
          <TableCell>
            <Loader color='dark' size='xs' />
          </TableCell>
        ) : (
          <>
            <TableCell>{order}</TableCell>
            <TableCell>{english}</TableCell>
            <TableCell>{vietnamese}</TableCell>
            <TableCell>
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
