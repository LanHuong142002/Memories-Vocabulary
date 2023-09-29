import { Flex, MantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useCallback, useMemo } from 'react';

// Hooks
import { useInfiniteVocabularies, useMutationPostVocabulary } from '@hooks';

// Stores
import { useNotificationStores } from '@stores';

// Constants
import {
  BUTTON_SIZE,
  ROUTES,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TAG_NAME,
  TYPOGRAPHY_VARIANT,
  BUTTON_VARIANT,
} from '@constants';

// Components
import { Wrapper } from '@layouts';
import { FormVocabulary } from '@pages';
import { Button, TableVocabulary, Typography } from '@components';

const Vocabulary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Stores
  const { setMessageError } = useNotificationStores();

  // Queries
  const {
    data: vocabularies,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteVocabularies(id);
  const { mutate: mutatePost, isLoading: isAdding } = useMutationPostVocabulary(id);

  const isDisabledButtonStartTest = useMemo(
    () => !(vocabularies && vocabularies?.pages[0].length >= 5),
    [vocabularies],
  );

  /**
   * @description function handle start testing with vocabularies of topic
   */
  const handleStartTest = useCallback(() => {
    if (id) {
      navigate(`${ROUTES.TESTING}/${id}`);
    }
  }, [id, navigate]);

  const handleAddVocabulary = useCallback(
    (valueENG: string, valueVIE: string) => {
      mutatePost(
        {
          vietnamese: valueVIE.trim(),
          english: valueENG.trim(),
        },
        {
          onError: (error) => {
            setMessageError(error.message);
          },
        },
      );
    },
    [mutatePost, setMessageError],
  );

  // get vocabularies with the id of topic selected
  useEffect(() => {
    if (!id) navigate(ROUTES.HOME);
  }, [id, navigate]);

  return (
    <Wrapper
      className='vocabularies'
      childrenTitle={useMemo(
        () => (
          <>
            <Typography size={TYPOGRAPHY_SIZE.XL}>Make Vocabulary with Translation</Typography>
            <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
              Add{' '}
              <Typography className='highlight' tagName={TYPOGRAPHY_TAG_NAME.SPAN}>
                (Min 5)
              </Typography>{' '}
              words of ENGLISH and Translate it into VIETNAMESE.
            </Typography>
          </>
        ),
        [],
      )}
    >
      <FormVocabulary id={id} onAddVocabulary={handleAddVocabulary} />
      <TableVocabulary
        topicId={id}
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        isAdding={isAdding}
        vocabularies={vocabularies?.pages}
      />
      <Flex
        className='actions-wrapper'
        justify='center'
        p='10px 0'
        gap='30px'
        align='center'
        direction='column'
        sx={(theme: MantineTheme) => ({
          textAlign: 'center',
          button: {
            width: '100%',
            [`@media (min-width: ${theme.breakpoints.md})`]: {
              width: 'fit-content',
            },
          },
        })}
      >
        {hasNextPage && (
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            className='button-load-more'
            onClick={fetchNextPage}
          >
            Load More
          </Button>
        )}
        <Button size={BUTTON_SIZE.M} disabled={isDisabledButtonStartTest} onClick={handleStartTest}>
          Start Test
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default Vocabulary;
