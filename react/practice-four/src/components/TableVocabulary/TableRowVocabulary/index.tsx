import { memo, useCallback } from 'react';
import { Loader } from '@mantine/core';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

// Interfaces
import { Vocabulary } from '@interfaces';

// Hooks
import { useMutationDeleteVocabulary } from '@hooks';

// Stores
import { useNotificationStores } from '@stores';

// Components
import { ShowModalConfirmDelete, TableCell, TableRow, Typography } from '@components';

interface TableRowVocabularyProps extends Vocabulary {
  id: string;
  topicId: string;
  order: number;
}

export const TableRowVocabulary = memo(
  ({ order, id, topicId, english, vietnamese }: TableRowVocabularyProps) => {
    const { mutate: mutateDelete, isLoading } = useMutationDeleteVocabulary(topicId);
    const { setMessageError } = useNotificationStores();

    /**
     * @description function delete a vocabulary
     */
    const handleDeleteVocabulary = useCallback(() => {
      mutateDelete(id, {
        onError: (error) => {
          setMessageError(error.message);
        },
      });
    }, [id, mutateDelete, setMessageError]);

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
              <ShowModalConfirmDelete
                topicId={topicId}
                onDeleteVocabulary={handleDeleteVocabulary}
              />
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
