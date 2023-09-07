import { useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Contexts
import { VocabularyContext } from '@contexts';

// Constants
import { BUTTON_SIZE, LABEL_COLOR, ROUTES, TYPOGRAPHY_SIZE } from '@constants';

// Layouts
import { Wrapper } from '@layouts';
import { Button, Label, TableResult, Typography } from '@components';

// Styles
import './index.css';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, vocabularies } = useContext(VocabularyContext);
  const result = useMemo(
    () =>
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
            <div className='total'>
              <Label color={LABEL_COLOR.NORMAL} name={`${percent}% percentage`} />
            </div>
            <div className='answers'>
              <Label color={LABEL_COLOR.SUCCESS} name={`${totalCorrectQuizzes} Rights`} />
              <Label
                color={LABEL_COLOR.FAILED}
                name={`${quizzes.length - totalCorrectQuizzes} Wrongs`}
              />
            </div>
          </>
        ),
        [percent, quizzes.length, totalCorrectQuizzes],
      )}
    >
      <div className='table-box'>
        <TableResult result={result} />
        <Link to={`${ROUTES.VOCABULARY}/${id}`}>
          <Button size={BUTTON_SIZE.S} label='Back to Vocabulary List' />
        </Link>
      </div>
    </Wrapper>
  );
};

export default Result;
