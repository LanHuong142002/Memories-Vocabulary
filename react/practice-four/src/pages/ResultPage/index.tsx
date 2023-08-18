import { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// Contexts
import { DictionaryContext } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Layouts
import { Wrapper } from '@layouts';
import { Button, Label, TableResult, Typography } from '@components';

// Styles
import './index.css';

const ResultPage = () => {
  const { id } = useParams();
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

export default ResultPage;
