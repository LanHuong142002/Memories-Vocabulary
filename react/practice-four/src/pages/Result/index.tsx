import { useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Contexts
import { VocabularyContext } from '@contexts';

// Constants
import { LABEL_COLOR, ROUTES, SIZE } from '@constants';

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
          <Typography size={SIZE.XL}>Quiz Result</Typography>
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
      }
    >
      <div className='table-box'>
        <TableResult result={result} />
        <Link to={`${ROUTES.VOCABULARY}/${id}`}>
          <Button size={SIZE.S} label='Back to Vocabulary List' />
        </Link>
      </div>
    </Wrapper>
  );
};

export default Result;
