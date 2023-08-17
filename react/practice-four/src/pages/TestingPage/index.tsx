import { ChangeEvent, useContext, useState } from 'react';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Typography } from '@components';

// Styles
import './index.css';
import { DictionaryContext } from '@contexts';

const TestingPage = () => {
  const { quizzes, onSetQuiz } = useContext(DictionaryContext);
  const [step, setStep] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  const handleSetStep = () => {
    if (step === quizzes.length - 1) {
      console.log('result');
    } else {
      setStep((prev) => {
        console.log(prev);
        return prev + 1;
      });
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // TODO: handle submit form
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answersArr = [...quizzes];
    answersArr[step] = {
      ...quizzes[step],
      answer: value,
    };
    onSetQuiz(answersArr);
  };

  return (
    <Wrapper
      className='testing'
      childrenTitle={
        <>
          <Typography size='xl'>Quiz</Typography>
          <Typography color='secondary' size='xs'>
            Give answers of <span className='testing-questions'>{quizzes.length} questions</span>.
            You have to translate English into Vietnamese
          </Typography>
        </>
      }
    >
      <form onSubmit={handleSubmit} className='testing-content'>
        <ProcessBar step={step + 1} totalStep={quizzes.length} />
        <Typography color='primary' size='m' textAlign='center'>
          {`Translate this "${quizzes[step].english}" word in English, into Vietnamese:`}
        </Typography>
        <Input
          variant='tertiary'
          value={value}
          onChange={handleOnChange}
          errors={[]}
          title='Vietnamese'
          placeholder='Type your answer here'
        />
        <div className='testing-actions'>
          <Button type='submit' size='xs' onClick={handleSetStep}>
            Next <span className='icon-next' />
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default TestingPage;
