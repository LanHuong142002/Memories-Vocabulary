import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, MantineTheme, Text } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Constants
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  INPUT_VARIANT,
  ROUTES,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Stores
import { useVocabulariesStores } from '@stores';

// Hooks
import { useVocabularies } from '@hooks';

// Helpers
import { getColorScheme, validation } from '@helpers';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Spinner, Typography } from '@components';

interface FormInput {
  value: string;
}

const Testing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      value: '',
    },
  });

  const { data: vocabulariesAll, isSuccess, isLoading } = useVocabularies(id || '', true);
  const { quizzes, setQuizzes } = useVocabulariesStores();
  const [step, setStep] = useState<number>(0);
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
      reset();
    }
  }, [id, navigate, quizzes.length, reset, step]);

  /**
   * @description function handle submit of form
   *
   * @param {Event} event is event of form element
   */
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const answersArr = [...quizzes];
    answersArr[step] = {
      ...quizzes[step],
      answer: data.value.trim(),
    };
    setQuizzes(answersArr);
    handleSetStep();
    reset();
  };

  useEffect(() => {
    if (vocabulariesAll && !vocabulariesAll.length) navigate(`${ROUTES.VOCABULARY}/${id}`);
  }, [id, navigate, vocabulariesAll]);

  useEffect(() => {
    if (isSuccess && vocabulariesAll) {
      setQuizzes(vocabulariesAll);
    }
  }, [isSuccess, setQuizzes, vocabulariesAll]);

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
      {isLoading ? (
        <Flex justify='center' className='testing-spinner-wrapper'>
          <Spinner />
        </Flex>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='testing-content'>
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
          <Controller
            name='value'
            rules={{
              validate: (v) => validation(v),
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                error={errors.value?.message || undefined}
                variant={INPUT_VARIANT.TERTIARY}
                label='Vietnamese'
                placeholder='Type your answer here'
                aria-label='Enter your answer'
                sx={{ margin: '20px 0' }}
                onChange={onChange}
              />
            )}
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
