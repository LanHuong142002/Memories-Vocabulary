import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, MantineTheme, Text } from '@mantine/core';
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
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Hooks
import { useDebounce, useVocabularies } from '@hooks';

// Helpers
import { getColorScheme, validation } from '@helpers';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Spinner, Typography } from '@components';

const Testing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vocabularies } = useVocabularies(id || '', true);
  // TODO: replace with Zustand store
  const { isLoadingQuizzes, quizzes, onSetQuiz } = useContext(VocabularyContext);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [step, setStep] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string | null>(value, 700);
  const quizValue = useMemo(
    () =>
      quizzes.length &&
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
    if (vocabularies && !vocabularies.length) {
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
      {isLoadingQuizzes ? (
        <Flex justify='center' className='testing-spinner-wrapper'>
          <Spinner />
        </Flex>
      ) : (
        <form onSubmit={handleSubmit} className='testing-content'>
          <ProcessBar
            step={step + 1}
            totalStep={quizzes.length}
            sx={{
              margin: '20px 0 30px 0',
            }}
          />
          <Typography
            color={TYPOGRAPHY_VARIANT.PRIMARY}
            size={TYPOGRAPHY_SIZE.M}
            sx={{
              textAlign: 'center',
            }}
          >
            {quizValue}
          </Typography>
          <Input
            variant={INPUT_VARIANT.TERTIARY}
            value={value}
            onChange={handleOnChange}
            errors={errors}
            label='Vietnamese'
            placeholder='Type your answer here'
            aria-label='Enter your answer'
            sx={{ margin: '20px 0' }}
          />
          <Box
            className='testing-actions'
            sx={(theme: MantineTheme) => ({
              textAlign: 'end',
              paddingBottom: '25px',
              '.icon-next': {
                padding: '4px',
                display: 'inline-block',
                borderWidth: '0 2px 2px 0',
                borderStyle: 'solid',
                borderColor: getColorScheme(
                  theme.colorScheme,
                  theme.colors.dark[3],
                  theme.colors.white[4],
                ),
                transform: 'rotate(-45deg)',
                marginLeft: '5px',
              },
            })}
          >
            <Button
              type={BUTTON_TYPE.SUBMIT}
              size={BUTTON_SIZE.XS}
              p='5px 15px'
              styles={{
                label: {
                  overflow: 'inherit',
                },
              }}
            >
              {buttonValue}
            </Button>
          </Box>
        </form>
      )}
    </Wrapper>
  );
};

export default Testing;
