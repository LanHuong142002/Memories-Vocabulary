import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Contexts
import { VocabularyContext } from '@contexts';

// Constants
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  INPUT_VARIANT,
  ROUTES,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TEXT_ALIGN,
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { validation } from '@helpers';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Spinner, Typography } from '@components';

// Styles
import './index.css';

const Testing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoadingQuizzes, vocabularies, quizzes, onSetQuiz } = useContext(VocabularyContext);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [step, setStep] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string | null>(value, 700);
  const quizValue = useMemo(
    () =>
      quizzes.length > 0 &&
      `Translate this "${quizzes[step].english}" word in English, into Vietnamese:`,
    [quizzes, step],
  );

  const buttonValue = useMemo(
    () =>
      step + 1 === quizzes.length ? (
        'Submit Answers'
      ) : (
        <>
          Next <span className='icon-next' />
        </>
      ),
    [quizzes.length, step],
  );

  /**
   * @description function handle step testing
   */
  const handleSetStep = useCallback(() => {
    if (step === quizzes.length - 1) {
      navigate(`${ROUTES.RESULT}/${id}`);
    } else {
      setStep((prev) => prev + 1);
      setValue('');
    }
  }, [id, navigate, quizzes.length, step]);

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
  const handleSubmit = useCallback(
    (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const listError = validation(value);
      setErrors(listError);

      if (!listError.length) {
        const answersArr = [...quizzes];
        answersArr[step] = {
          ...quizzes[step],
          answer: value.trim(),
        };
        onSetQuiz(answersArr);
        setErrors(null);
        handleSetStep();
      }
    },
    [handleSetStep, onSetQuiz, quizzes, step, value],
  );

  // show errors of input vietnamese after delay 0.7s
  useEffect(() => {
    if (debouncedValue) {
      const listError = validation(debouncedValue);
      setErrors(listError);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!vocabularies.length) {
      navigate(`${ROUTES.VOCABULARY}/${id}`);
    }
  }, [id, navigate, vocabularies]);

  return (
    <Wrapper
      className='testing'
      childrenTitle={useMemo(
        () => (
          <>
            <Typography size={TYPOGRAPHY_SIZE.XL}>Quiz</Typography>
            <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
              Give answers of <span className='testing-questions'>{quizzes.length} questions</span>.
              You have to translate English into Vietnamese
            </Typography>
          </>
        ),
        [quizzes.length],
      )}
    >
      {isLoadingQuizzes ? (
        <div className='testing-spinner-wrapper'>
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='testing-content'>
          <ProcessBar step={step + 1} totalStep={quizzes.length} />
          <Typography
            color={TYPOGRAPHY_VARIANT.PRIMARY}
            size={TYPOGRAPHY_SIZE.M}
            textAlign={TYPOGRAPHY_TEXT_ALIGN.CENTER}
          >
            {quizValue}
          </Typography>
          <Input
            variant={INPUT_VARIANT.TERTIARY}
            value={value}
            onChange={handleOnChange}
            errors={errors}
            title='Vietnamese'
            placeholder='Type your answer here'
            ariaLabel='Enter your answer'
          />
          <div className='testing-actions'>
            <Button type={BUTTON_TYPE.SUBMIT} size={BUTTON_SIZE.XS}>
              {buttonValue}
            </Button>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default Testing;
