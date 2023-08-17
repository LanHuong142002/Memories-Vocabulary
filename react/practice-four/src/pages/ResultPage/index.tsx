import { Label, Typography } from '@components';
import { DictionaryContext } from '@contexts';
import { Wrapper } from '@layouts';
import { useContext } from 'react';

const ResultPage = () => {
  const { quizzes } = useContext(DictionaryContext);
  console.log(quizzes);

  return (
    <Wrapper
      className='result'
      childrenTitle={
        <>
          <Typography size='xl'>Quiz Result</Typography>
          <div>
            <Label color='normal' name='60% percentage' />
          </div>
          <div>
            <Label color='success' name='3 Right' />
            <Label color='failed' name='2 Wrong' />
          </div>
        </>
      }
    >
      123
    </Wrapper>
  );
};

export default ResultPage;
