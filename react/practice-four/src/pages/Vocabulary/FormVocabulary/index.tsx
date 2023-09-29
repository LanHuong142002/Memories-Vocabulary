import { memo, useCallback } from 'react';
import { Box, MantineTheme } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Constants
import { BUTTON_TYPE, INPUT_VARIANT, MESSAGE_ERRORS } from '@constants';

// Helpers
import { validation } from '@helpers';

// Hooks
import { useVocabularies } from '@hooks';

// Components
import { Button, Input } from '@components';

interface FormInput {
  valueENG: string;
  valueVIE: string;
}

const FormVocabulary = ({
  id = '',
  onAddVocabulary,
}: {
  id?: string;
  onAddVocabulary: (valueENG: string, valueVIE: string) => void;
}) => {
  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      valueENG: '',
      valueVIE: '',
    },
  });

  // Queries
  const { isFetching: isLoadingCheckExisted, refetch } = useVocabularies({
    id,
    enabled: false,
    page: 1,
    param: `?english=${getValues('valueENG')}`,
  });

  /**
   * @description function add new vocabulary
   */
  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async (data) => {
      const res = await refetch();
      if (res.data && res.data.length === 0) {
        onAddVocabulary(data.valueENG, data.valueVIE);
        reset();
      } else {
        setError('valueENG', { type: 'validate', message: MESSAGE_ERRORS.EXISTED });
      }
    },
    [onAddVocabulary, refetch, reset, setError],
  );

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      className='form-add-new-vocabulary'
      sx={(theme: MantineTheme) => ({
        height: 'max-content',
        margin: 'auto',
        padding: '20px 0',
        display: 'flex',
        gap: '30px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        button: {
          width: '100%',
        },
        [`@media (min-width: ${theme.breakpoints.xs})`]: {
          flexDirection: 'row',
          button: {
            height: '100%',
            width: 'fit-content',
          },
        },
      })}
    >
      <Controller
        name='valueENG'
        rules={{
          validate: (v) => validation(v),
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            label='English (Native)'
            variant={INPUT_VARIANT.SECONDARY}
            error={errors.valueENG?.message}
            aria-label='enter english'
            dataTestId='input-english'
            sx={{ margin: '20px 0' }}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name='valueVIE'
        rules={{
          validate: (v) => validation(v),
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            label='In Vietnamese'
            error={errors.valueVIE?.message}
            variant={INPUT_VARIANT.SECONDARY}
            dataTestId='input-vietnamese'
            aria-label='enter vietnamese'
            sx={{ margin: '20px 0' }}
            onChange={onChange}
          />
        )}
      />
      <Button type={BUTTON_TYPE.SUBMIT} disabled={isLoadingCheckExisted}>
        Add
      </Button>
    </Box>
  );
};

export default memo(FormVocabulary);
