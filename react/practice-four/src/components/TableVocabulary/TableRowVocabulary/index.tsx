import { memo } from 'react';
import { Loader } from '@mantine/core';

// Constants
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TAG_NAME,
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Interfaces
import { Vocabulary } from '@interfaces';

//
import { Button, TableCell, TableRow, Typography } from '@components';

interface TableRowVocabularyProps extends Vocabulary {
  isLoading: boolean;
  order: number;
  onClick: (id: string) => void;
}

export const TableRowVocabulary = memo(
  ({ isLoading, order, id, english, vietnamese, onClick }: TableRowVocabularyProps) => {
    const handleOnClick = () => {
      onClick(id!);
    };

    return (
      <>
        {isLoading ? (
          <TableRowLoading />
        ) : (
          <TableRow>
            <TableCell>{order}</TableCell>
            <TableCell>{english}</TableCell>
            <TableCell>{vietnamese}</TableCell>
            <TableCell>
              <Button
                p='5px'
                variant={BUTTON_VARIANT.SECONDARY}
                onClick={handleOnClick}
                dataTestId='button-delete-vocabulary'
              >
                X
              </Button>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  },
);

export const TableRowEmpty = memo(() => (
  <TableRow>
    <TableCell>
      <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
        Fill All Filed At Above And Press{' '}
        <Typography className='highlight' tagName={TYPOGRAPHY_TAG_NAME.SPAN}>
          ENTER
        </Typography>{' '}
        key or button Add
      </Typography>
    </TableCell>
  </TableRow>
));

export const TableRowLoading = memo(() => (
  <TableRow>
    <TableCell>
      <Loader color='dark' size='xs' />
    </TableCell>
  </TableRow>
));
