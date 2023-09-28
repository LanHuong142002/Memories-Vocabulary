import { memo, useMemo } from 'react';
import { Box, MantineTheme } from '@mantine/core';

// Interfaces
import { Vocabulary } from '@interfaces';

// Helpers
import { getColorScheme } from '@helpers';

// Components
import {
  TableCell,
  TableRow,
  TableRowEmpty,
  TableRowLoading,
  TableVocabularyBody,
} from '@components';

export interface TableVocabularyProps {
  isLoading: boolean;
  isAdding: boolean;
  isLoadingMore: boolean;
  deletingById: {
    [id: string]: boolean;
  };
  vocabularies: Vocabulary[][];
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
    <Box
      className='table-vocabulary'
      sx={(theme: MantineTheme) => ({
        fontSize: theme.fontSizes.xxs,
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
        '.row': {
          display: 'flex',
        },
        '.cell': {
          width: '100%',
          padding: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.colors.dark[0]}`,
        },
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          fontSize: theme.fontSizes.xs,
        },
      })}
    >
      <Box
        className='table-header'
        sx={(theme: MantineTheme) => ({
          fontWeight: theme.other.fontWeight.bold,
        })}
      >
        {useMemo(
          () => (
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>English (Native)</TableCell>
              <TableCell>Vietnamese</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          ),
          [],
        )}
      </Box>
      <Box
        className='table-body'
        sx={(theme: MantineTheme) => ({
          '.row:nth-of-type(even):hover, .row:nth-of-type(odd)': {
            backgroundColor: getColorScheme(
              theme.colorScheme,
              theme.colors.dark[2],
              theme.colors.white[0],
            ),
          },
        })}
      >
        {/* If fetching api to get vocabularies, show loading */}
        {isLoading ? (
          <TableRowLoading />
        ) : (
          // After fetching, render the vocabulary list
          <>
            {vocabularies.length ? (
              <TableVocabularyBody
                deletingById={deletingById}
                isAdding={isAdding}
                isLoadingMore={isLoadingMore}
                onClick={onClick}
                vocabularies={vocabularies}
              />
            ) : (
              // This is usually appropriate if there is no vocabulary in the list
              <TableRowEmpty />
            )}
          </>
        )}
      </Box>
    </Box>
  ),
);

export default TableVocabulary;
