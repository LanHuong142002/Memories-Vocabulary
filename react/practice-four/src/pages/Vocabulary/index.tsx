import { useDisclosure } from '@mantine/hooks';
import { Box, Flex, MantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';

// Hooks
import {
  useInfiniteVocabularies,
  useMutationDeleteVocabulary,
  useMutationPostVocabulary,
  useVocabularies,
} from '@hooks';

// Stores
import { useNotificationStores } from '@stores';

// Helpers
import { validation } from '@helpers';

// Constants
import {
  MESSAGE_ERRORS,
  BUTTON_SIZE,
  BUTTON_TYPE,
  INPUT_VARIANT,
  ROUTES,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TAG_NAME,
  TYPOGRAPHY_VARIANT,
  BUTTON_VARIANT,
} from '@constants';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, Modal, TableVocabulary, Typography } from '@components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormInput {
  valueENG: string;
  valueVIE: string;
}

const Vocabulary = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [vocabularyId, setVocabularyId] = useState<string>('');

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    watch,
  } = useForm<FormInput>({
    defaultValues: {
      valueENG: '',
      valueVIE: '',
    },
  });

  // Queries
  const { isFetching: isLoadingCheckExisted, refetch } = useVocabularies(
    id || '',
    false,
    1,
    `?english=${watch('valueENG')}`,
  );
  const {
    data: vocabularies,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteVocabularies(id || '');
  const { mutate: mutateDelete, isLoading: isDeleting } = useMutationDeleteVocabulary(id || '');
  const { mutate: mutatePost, isLoading: isAdding } = useMutationPostVocabulary(id || '');

  // Stores
  const { setMessageError } = useNotificationStores();

  const isDisabledButtonStartTest = useMemo(
    () => !(vocabularies && vocabularies?.pages[0].length >= 5),
    [vocabularies],
  );

  /**
   * @description function handle start testing with vocabularies of topic
   */
  const handleStartTest = useCallback(() => {
    if (id) {
      navigate(`${ROUTES.TESTING}/${id}`);
    }
  }, [id, navigate]);

  /**
   * @description function delete a vocabulary
   */
  const handleDeleteVocabulary = useCallback(() => {
    mutateDelete(vocabularyId, {
      onError: (error) => {
        setMessageError(error.message);
      },
    });
    close();
  }, [close, mutateDelete, setMessageError, vocabularyId]);

  /**
   * @description function open confirm modal and get vocabulary id
   */
  const handleOpenConfirmModalInRow = useCallback(
    (id: string) => {
      open();
      setVocabularyId(id);
    },
    [open],
  );

  /**
   * @description function add new vocabulary
   */
  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async (data) => {
      const res = await refetch();
      if (res.data && res.data.length === 0) {
        mutatePost(
          {
            vietnamese: data.valueVIE.trim(),
            english: data.valueENG.trim(),
          },
          {
            onError: (error) => {
              setMessageError(error.message);
            },
          },
        );
        reset();
      } else {
        setError('valueENG', { type: 'validate', message: MESSAGE_ERRORS.EXISTED });
      }
    },
    [mutatePost, refetch, reset, setError, setMessageError],
  );

  // get vocabularies with the id of topic selected
  useEffect(() => {
    if (!id) navigate(ROUTES.HOME);
  }, [id, navigate]);

  return (
    <Wrapper
      className='vocabularies'
      childrenTitle={useMemo(
        () => (
          <>
            <Typography size={TYPOGRAPHY_SIZE.XL}>Make Vocabulary with Translation</Typography>
            <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
              Add{' '}
              <Typography className='highlight' tagName={TYPOGRAPHY_TAG_NAME.SPAN}>
                (Min 5)
              </Typography>{' '}
              words of ENGLISH and Translate it into VIETNAMESE.
            </Typography>
          </>
        ),
        [],
      )}
    >
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
      <TableVocabulary
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        isAdding={isAdding}
        deletingById={{ [vocabularyId]: isDeleting }}
        vocabularies={vocabularies?.pages}
        onClick={handleOpenConfirmModalInRow}
      />
      <Flex
        className='actions-wrapper'
        justify='center'
        p='10px 0'
        gap='30px'
        align='center'
        direction='column'
        sx={(theme: MantineTheme) => ({
          textAlign: 'center',
          button: {
            width: '100%',
            [`@media (min-width: ${theme.breakpoints.md})`]: {
              width: 'fit-content',
            },
          },
        })}
      >
        {hasNextPage && (
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            className='button-load-more'
            onClick={fetchNextPage}
          >
            Load More
          </Button>
        )}
        <Button size={BUTTON_SIZE.M} disabled={isDisabledButtonStartTest} onClick={handleStartTest}>
          Start Test
        </Button>
      </Flex>

      <Modal
        onClose={close}
        opened={opened}
        description='Are you sure to delete this vocabulary?'
        title='Confirm Delete'
      >
        <Button
          variant={BUTTON_VARIANT.SECONDARY}
          size={BUTTON_SIZE.XS}
          onClick={close}
          sx={{ height: '35px' }}
        >
          Cancel
        </Button>
        <Button
          variant={BUTTON_VARIANT.PRIMARY}
          size={BUTTON_SIZE.XS}
          onClick={handleDeleteVocabulary}
        >
          Delete
        </Button>
      </Modal>
    </Wrapper>
  );
};

export default Vocabulary;
