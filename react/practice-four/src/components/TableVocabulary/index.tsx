import { memo } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableRowVocabulary,
  Typography,
} from '@components';

import './index.css';

export interface TableVocabularyProps {
  isLoading: boolean;
  vocabularies: Vocabulary[];
  onClick: (id: string) => void;
}

const TableVocabulary = memo(({ isLoading, vocabularies, onClick }: TableVocabularyProps) => (
  <Table className='vocabularies'>
    <TableHeader>
      <TableRow>
        <TableCell tagName='th'>No.</TableCell>
        <TableCell tagName='th'>English (Native)</TableCell>
        <TableCell tagName='th'>Vietnamese</TableCell>
        <TableCell tagName='th'>Action</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell className='cell-loading' colspan={4}>
            <Spinner size='s' />
          </TableCell>
        </TableRow>
      ) : (
        <>
          {vocabularies.length > 0 ? (
            <>
              {vocabularies.map(({ id, english, vietnamese }, index) => (
                <TableRowVocabulary
                  key={`table-vocabulary-${index}`}
                  id={id}
                  order={index + 1}
                  english={english}
                  vietnamese={vietnamese}
                  onClick={onClick}
                />
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colspan={4}>
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
    </TableBody>
  </Table>
));

export default TableVocabulary;
