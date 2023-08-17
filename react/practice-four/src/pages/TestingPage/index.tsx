import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { validation } from '@helpers';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Typography } from '@components';

// Styles
import './index.css';

const TestingPage = () => {
  const navigate = useNavigate();
  const { quizzes, onSetQuiz } = useContext(DictionaryContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string | null>(value, 700);

  /**
   * @description function handle step testing
   */
  const handleSetStep = () => {
    if (step === quizzes.length - 1) {
      navigate(ROUTES.RESULT);
    } else {
      setStep((prev) => prev + 1);
      setValue('');
    }
  };

  /**
   * @description function handle onchange of input
   * @param event
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  /**
   * @description function handle submit of form
   *
   * @param {Event} event is event of form element
   */
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listError = validation(value);
    setErrors(listError);

    if (!listError.length) {
      const answersArr = [...quizzes];
      answersArr[step] = {
        ...quizzes[step],
        answer: value,
      };
      onSetQuiz(answersArr);
      handleSetStep();
    }
  };

  // show errors of input vietnamese after delay 0.7s
  useEffect(() => {
    if (debouncedValue) {
      const listError = validation(debouncedValue);
      setErrors(listError);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!(quizzes.length > 0)) {
      navigate(-1);
    }
  }, [navigate, quizzes]);

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
          {`Translate this "${
            quizzes.length > 0 && quizzes[step].english
          }" word in English, into Vietnamese:`}
        </Typography>
        <Input
          variant='tertiary'
          value={value}
          onChange={handleOnChange}
          errors={errors}
          title='Vietnamese'
          placeholder='Type your answer here'
        />
        <div className='testing-actions'>
          <Button type='submit' size='xs'>
            {step + 1 === quizzes.length ? (
              'Submit Answers'
            ) : (
              <>
                Next <span className='icon-next' />
              </>
            )}
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default TestingPage;
