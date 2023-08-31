import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Interfaces
import { Vocabulary } from '@interfaces';

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
            <Spinner size='s' />
          </TableCell>
        </TableRow>
      ) : (
        <>
          {vocabularies.length > 0 ? (
            <>
              {vocabularies.map(({ id, english, vietnamese }, index) => (
                <TableRowVocabulary
                  isLoading={deletingById[id]}
                  key={`table-vocabulary-${uuidv4()}`}
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
                    <Spinner size='s' />
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <TableRow>
              <TableCell>
                <Typography color='secondary' size='xs'>
                  Fill All Filed At Above And Press{' '}
                  <Typography className='highlight' tagName='span'>
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
