import { useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Contexts
import { DictionaryContext } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Layouts
import { Wrapper } from '@layouts';
import { Button, Label, TableResult, Typography } from '@components';

// Styles
import './index.css';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, vocabularies } = useContext(DictionaryContext);
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
  const totalCorrectQuizzes = useMemo(
    () => quizzes.filter((quiz) => quiz.answer === quiz.vietnamese).length,
    [quizzes],
  );
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
      childrenTitle={
        <>
          <Typography size='xl'>Quiz Result</Typography>
          <div className='total'>
            <Label color='normal' name={`${percent}% percentage`} />
          </div>
          <div className='answers'>
            <Label color='success' name={`${totalCorrectQuizzes} Right`} />
            <Label color='failed' name={`${quizzes.length - totalCorrectQuizzes} Wrong`} />
          </div>
        </>
      }
    >
      <div className='table-box'>
        <TableResult result={result} />
        <Link to={`${ROUTES.VOCABULARY}/${id}`}>
          <Button size='s' label='Back to Vocabulary List' />
        </Link>
      </div>
    </Wrapper>
  );
};

export default Result;
