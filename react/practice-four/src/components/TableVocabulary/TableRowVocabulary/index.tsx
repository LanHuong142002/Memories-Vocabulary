import { ReactNode, memo, useCallback } from 'react';
import { Loader } from '@mantine/core';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_VARIANT } from '@constants';

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

export const TableRowEmpty = memo(({ children }: { children: ReactNode }) => (
  <TableRow>
    <TableCell>
      <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS} m={0}>
        {children}
      </Typography>
    </TableCell>
  </TableRow>
));

export const TableRowLoading = memo(() => (
  <TableRow>
    <TableCell>
      <Loader color='dark' size='xs' data-testid='loading' />
    </TableCell>
  </TableRow>
));
