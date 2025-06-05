import { useCallback, useState } from 'react';
import { Box, MantineTheme, Overlay } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Constants
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  BUTTON_VARIANT,
  INPUT_VARIANT,
  TOPIC_VARIANT,
  TYPOGRAPHY_SIZE,
} from '@constants';

// Helpers
import { validation } from '@helpers';

// Components
import { Button, Input, Topic, Typography } from '@components';

interface FormInput {
  value: string;
}

const AddNew = ({ onAddTopic }: { onAddTopic: (value: string) => void }) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);

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

  /**
   * @description function show hide overlay add new
   */
  const handleOpenOverlay = useCallback(() => {
    setIsOpenOverlay((prev) => !prev);
  }, []);

  /**
   * @description function add new topic
   */
  const onSubmit: SubmitHandler<FormInput> = useCallback(
    (data) => {
      onAddTopic(data.value);
      handleOpenOverlay();
      reset();
    },
    [handleOpenOverlay, onAddTopic, reset],
  );

  return (
    <>
      <Topic variant={TOPIC_VARIANT.SELECTED} isAddNew={true} onClick={handleOpenOverlay}>
        Add Topic
      </Topic>
      {isOpenOverlay && (
        <Overlay
          styles={{
            root: {
              height: '100%',
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 5,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'var(--overlay-opacity)',
              animation: 'opacityAnimation linear 0.2s',
            },
          }}
        >
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            size={BUTTON_SIZE.XXL}
            onClick={handleOpenOverlay}
            sx={(theme: MantineTheme) => ({
              top: '10px',
              right: '20px',
              position: 'absolute',
              fontSize: theme.fontSizes.xxl,
            })}
          >
            &Chi;
          </Button>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            className='overlay-content'
            sx={{
              marginTop: '100px',
              minWidth: '300px',
              height: 'fit-content',
              position: 'absolute',
              top: '10%',
              left: '50%',
              borderRadius: '8px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography size={TYPOGRAPHY_SIZE.XXL} sx={{ textAlign: 'center' }}>
              Add New Topic
            </Typography>
            <Controller
              name='value'
              rules={{
                validate: (v) => validation(v, true),
              }}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  variant={INPUT_VARIANT.PRIMARY}
                  placeholder='Topic Name'
                  error={errors.value?.message}
                  aria-label='enter topic'
                  sx={(theme: MantineTheme) => ({
                    margin: '30px 0 10px 0',
                    input: {
                      '::placeholder': {
                        fontSize: theme.fontSizes.l,
                      },
                    },
                  })}
                  onChange={onChange}
                />
              )}
            />
            <Button
              type={BUTTON_TYPE.SUBMIT}
              size={BUTTON_SIZE.M}
              sx={{
                width: '100%',
              }}
            >
              Done
            </Button>
          </Box>
        </Overlay>
      )}
    </>
  );
};

export default AddNew;
