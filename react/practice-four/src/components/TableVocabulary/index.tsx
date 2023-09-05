import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Constants
import { SPINNER_SIZE, TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

// Components
import { Spinner, Table, TableCell, TableRow, TableRowVocabulary, Typography } from '@components';

// Styles
import './index.css';

export interface TableVocabularyProps {
  isLoading: boolean;
  isAdding: boolean;
  isLoadingMore: boolean;
  deletingById: {
    [id: string]: boolean;
  };
  vocabularies: Vocabulary[];
  onClick: (id: string) => void;
}

const TableVocabulary = memo(
  ({
    isLoading,
    isAdding,
    isLoadingMore,
    deletingById,
    vocabularies,
    onClick,
  }: TableVocabularyProps) => (
    <Table
      className='table-vocabulary'
      childrenHeader={
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>English (Native)</TableCell>
          <TableCell>Vietnamese</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      }
    >
      {isLoading ? (
        <TableRow>
          <TableCell className='cell-loading'>
            <Spinner size={SPINNER_SIZE.S} />
          </TableCell>
        </TableRow>
      ) : (
        <>
          {vocabularies.length > 0 ? (
            <>
              {vocabularies.map(({ id, english, vietnamese }, index) => (
                <TableRowVocabulary
                  isLoading={deletingById[id]}
                  key={`table-vocabulary-${id}`}
                  id={id}
                  order={index + 1}
                  english={english}
                  vietnamese={vietnamese}
                  onClick={onClick}
                />
              ))}
              {(isAdding || isLoadingMore) && (
                <TableRow>
                  <TableCell className='cell-loading'>
                    <Spinner size={SPINNER_SIZE.S} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
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
          )}
        </>
      )}
    </Table>
  ),
);

export default TableVocabulary;
