import { useParams } from 'react-router-dom';
import { Flex, MantineTheme, Text } from '@mantine/core';
import { useEffect, useMemo } from 'react';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_VARIANT } from '@constants';

// Stores
import { useVocabulariesStores } from '@stores';

// Hooks
import { useVocabularies } from '@hooks';

// Components
import { Wrapper } from '@layouts';
import { Spinner, Typography } from '@components';
import FormTesting from './FormTesting';

const Testing = () => {
  const { id } = useParams();
  // Queries
  const { data: vocabulariesAll, isSuccess, isLoading } = useVocabularies(id || '', true);

  // Stores
  const { quizzes, setQuizzes } = useVocabulariesStores();

  useEffect(() => {
    if (isSuccess && vocabulariesAll) {
      setQuizzes(vocabulariesAll);
    }
  }, [isSuccess, setQuizzes, vocabulariesAll]);

  return (
    <Wrapper
      className='testing'
      childrenTitle={useMemo(
        () => (
          <>
            <Typography size={TYPOGRAPHY_SIZE.XL}>Quiz</Typography>
            <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
              Give answers of{' '}
              <Text
                component='span'
                sx={(theme: MantineTheme) => ({
                  fontWeight: theme.other.fontWeight.bold,
                })}
              >
                {quizzes.length} questions
              </Text>
              . You have to translate English into Vietnamese
            </Typography>
          </>
        ),
        [quizzes.length],
      )}
    >
      {isLoading ? (
        <Flex justify='center' className='testing-spinner-wrapper'>
          <Spinner />
        </Flex>
      ) : (
        <FormTesting id={id} vocabulariesAll={vocabulariesAll} />
      )}
    </Wrapper>
  );
};

export default Testing;
