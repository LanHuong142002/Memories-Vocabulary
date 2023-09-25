import { useVocabularies } from '@hooks';
import { useEffect, useMemo } from 'react';
import { Box, Flex, MantineTheme } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Constants
import { BUTTON_SIZE, LABEL_COLOR, ROUTES, TYPOGRAPHY_SIZE } from '@constants';

// Stores
import { useVocabulariesStores } from '@stores';

// Layouts
import { Wrapper } from '@layouts';
import { Button, Label, TableResult, Typography } from '@components';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useVocabulariesStores();
  const { data: vocabularies } = useVocabularies(id || '', true);
  const result = useMemo(
    () =>
      vocabularies &&
      vocabularies.map((vocab) => {
        const { id: vocabID } = vocab || {};

        return {
          ...vocab,
          answer: quizzes.find(({ id }) => id === vocabID)?.answer || '',
        };
      }),
    [quizzes, vocabularies],
  );

  // Calculate the total correct answers
  const totalCorrectQuizzes = useMemo(
    () =>
      quizzes.filter((quiz) => (quiz.answer || '').toLowerCase() === quiz.vietnamese.toLowerCase())
        .length,
    [quizzes],
  );

  // Calculate the percentage of correct answers
  const percent = useMemo(
    () => Math.round((totalCorrectQuizzes / quizzes.length) * 100),
    [quizzes.length, totalCorrectQuizzes],
  );

  useEffect(() => {
    if (!(quizzes.length > 0)) {
      navigate(`${ROUTES.VOCABULARY}/${id}`);
    }
  }, [id, navigate, quizzes]);

  return (
    <Wrapper
      className='result'
      childrenTitle={useMemo(
        () => (
          <>
            <Typography size={TYPOGRAPHY_SIZE.XL}>Quiz Result</Typography>
            <Flex className='total' justify='center'>
              <Label color={LABEL_COLOR.NORMAL} name={`${percent}% percentage`} />
            </Flex>
            <Flex className='answers' justify='center' gap='8px' p='10px 0'>
              <Label color={LABEL_COLOR.SUCCESS} name={`${totalCorrectQuizzes} Rights`} />
              <Label
                color={LABEL_COLOR.FAILED}
                name={`${quizzes.length - totalCorrectQuizzes} Wrongs`}
              />
            </Flex>
          </>
        ),
        [percent, quizzes.length, totalCorrectQuizzes],
      )}
    >
      <Box
        className='table-box'
        sx={(theme: MantineTheme) => ({
          textAlign: 'center',
          width: '250px',
          margin: 'auto',
          [`@media (min-width: ${theme.breakpoints.xs})`]: {
            width: '430px',
          },
        })}
      >
        <TableResult result={result || []} />
        <Link to={`${ROUTES.VOCABULARY}/${id}`}>
          <Button
            size={BUTTON_SIZE.S}
            sx={{
              marginTop: '20px',
            }}
          >
            Back to Vocabulary List
          </Button>
        </Link>
      </Box>
    </Wrapper>
  );
};

export default Result;
