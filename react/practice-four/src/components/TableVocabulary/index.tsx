import { memo, useMemo } from 'react';
import { Box, Loader, MantineTheme } from '@mantine/core';

// Interfaces
import { Vocabulary } from '@interfaces';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

// Components
import { TableCell, TableRow, TableRowVocabulary, Typography } from '@components';

// Helpers
import { getColorScheme } from '@helpers';

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
  }: TableVocabularyProps) => {
    const orderItemNestedArray = (index: number, indexNested: number) => {
      return index === 0 ? indexNested + 1 : (index + 1) * 10 + indexNested + 1;
    };

    return (
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
            '.row:nth-of-type:first-of-type(even):hover, .row:nth-of-type:first-of-type(odd)': {
              backgroundColor: getColorScheme(
                theme.colorScheme,
                theme.colors.dark[2],
                theme.colors.white[0],
              ),
            },
          })}
        >
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Loader color='dark' size='xs' />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {vocabularies.length ? (
                vocabularies.map((item, index) => (
                  <div key={`table-vocabulary-row${index}`}>
                    {item.map(({ id, english, vietnamese }, indexNested) => (
                      <TableRowVocabulary
                        isLoading={deletingById[id]}
                        key={`table-vocabulary-${id}`}
                        id={id}
                        order={orderItemNestedArray(index, indexNested)}
                        english={english}
                        vietnamese={vietnamese}
                        onClick={onClick}
                      />
                    ))}
                    {(isAdding || isLoadingMore) && (
                      <TableRow>
                        <TableCell>
                          <Loader color='dark' size='xs' />
                        </TableCell>
                      </TableRow>
                    )}
                  </div>
                ))
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
        </Box>
      </Box>
    );
  },
);

export default TableVocabulary;
