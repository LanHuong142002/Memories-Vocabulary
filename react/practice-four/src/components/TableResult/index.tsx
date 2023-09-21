import { useMemo } from 'react';
import { Box, MantineTheme } from '@mantine/core';

// Interfaces
import { VocabularyResult } from '@interfaces';

// Components
import { TableCell, TableRow, TableRowResult } from '@components';

// Helpers
import { getColorScheme } from '@helpers';

interface TableResultProps {
  result: VocabularyResult[];
}

const TableResult = ({ result }: TableResultProps) => {
  const isSuccess = useMemo(
    () => (answer: string | undefined, vietnamese: string) =>
      !!((answer || '').toLowerCase() === vietnamese.toLowerCase()),
    [],
  );

  return (
    <Box
      className='table-result'
      sx={(theme: MantineTheme) => ({
        fontSize: theme.fontSizes.xxs,
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
        '.row': {
          minHeight: '70px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: 0,
        },
        '.cell': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${theme.colors.dark[0]}`,
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
          '.cell:nth-child(1)': {
            gridRow: '1/3',
          },
          '.cell:nth-child(3)': {
            gridColumn: '3/5',
          },
          '.cell:nth-child(4)': {
            gridColumn: '5',
            gridRow: '1/3',
          },
          '.cell:nth-child(5)': {
            gridColumn: '2',
          },
        })}
      >
        {useMemo(
          () => (
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>English</TableCell>
              <TableCell>Vietnamese</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Native</TableCell>
              <TableCell>Translation</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          ),
          [],
        )}
      </Box>
      <Box
        className='table-body'
        sx={(theme: MantineTheme) => ({
          '.row:nth-child(even):hover, .row:nth-child(odd)': {
            backgroundColor: getColorScheme(
              theme.colorScheme,
              theme.colors.dark[2],
              theme.colors.white[0],
            ),
          },
          '.cell:first-child': {
            gridRow: '1/3',
          },
          '.cell:nth-child(2)': {
            gridRow: '1/3',
          },
          '.cell:nth-child(5)': {
            gridColumn: '3/5',
            color: theme.colors.dark[3],
          },
          '.cell:last-child': {
            gridColumn: '5',
            gridRow: '1/3',
            color: theme.colors.dark[3],
          },
        })}
      >
        {result.map(({ id, answer, english, vietnamese }, index) => (
          <TableRowResult
            id={id}
            key={`table-result-${id}`}
            order={`${index + 1}`}
            answer={answer}
            isSuccess={isSuccess(answer, vietnamese)}
            english={english}
            vietnamese={vietnamese}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TableResult;
