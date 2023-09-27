import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Box, Flex, MantineTheme } from '@mantine/core';
import { useState, ChangeEvent, useEffect, useCallback, useMemo } from 'react';

// Hooks
import {
  useDebounce,
  useInfiniteVocabularies,
  useMutationDeleteVocabulary,
  useMutationPostVocabulary,
  useVocabularies,
} from '@hooks';

// Stores
import { useNotificationStores, useVocabulariesStores } from '@stores';

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

const Vocabulary = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [vocabularyId, setVocabularyId] = useState<string>('');
  // Flags
  const [isRandomQuizzes, setIsRandomQuizzes] = useState<boolean>(false);
  const [isExisted, setIsExisted] = useState<boolean>(false);
  // value ENG
  const [valueENG, setValueENG] = useState<string>('');
  const [errorsENG, setErrorsENG] = useState<string[]>([]);
  const debouncedValueENG = useDebounce<string | null>(valueENG, 700);
  // Value VIE
  const [valueVIE, setValueVIE] = useState<string>('');
  const [errorsVIE, setErrorsVIE] = useState<string[]>([]);
  const debouncedValueVIE = useDebounce<string | null>(valueVIE, 700);

  // Hooks
  const { onRandomQuizzes } = useVocabulariesStores();
  const { setMessageError } = useNotificationStores();
  const { data: vocabulariesAll } = useVocabularies(id || '', isRandomQuizzes);
  const { mutate: mutateDelete, isLoading: isDeleting } = useMutationDeleteVocabulary(id || '');
  const { mutate: mutatePost, isLoading: isAdding } = useMutationPostVocabulary(id || '');
  const { data: vocabularyByValue, isFetching: isLoadingCheckExisted } = useVocabularies(
    id || '',
    isExisted,
    1,
    `?english=${valueENG}`,
  );
  const {
    data: vocabularies,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteVocabularies(id || '');

  const isDisabledButtonStartTest = useMemo(
    () => !(vocabularies && vocabularies?.pages[0].length >= 5),
    [vocabularies],
  );

  /**
   * @description function onchange to get value from input english
   *
   * @param {Event} event of inputs
   */
  const handleOnChangeENG = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueENG(event.target.value);
  }, []);

  /**
   * @description function onchange to get value from input vietnamese
   *
   * @param {Event} event of inputs
   */
  const handleOnChangeVIE = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueVIE(event.target.value);
  }, []);

  /**
   * @description function add new vocabulary
   *
   * @param {Event} event is event of form
   */
  const handleAddNewVocabulary = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valueInputENG = (event.target[0] as HTMLInputElement).value;
    const valueInputVIE = (event.target[1] as HTMLInputElement).value;

    const listErrorVIE = validation(valueInputVIE);
    const listErrorENG = validation(valueInputENG);
    setErrorsVIE(listErrorVIE);
    setErrorsENG(listErrorENG);

    if (!listErrorVIE.length && !listErrorENG.length && id) {
      setValueENG(valueInputENG.trim());
      setIsExisted(true);
      console.log(vocabularyByValue);

      if (vocabularyByValue && vocabularyByValue.length === 0) {
        mutatePost(
          {
            vietnamese: valueInputVIE.trim(),
            english: valueInputENG.trim(),
          },
          {
            onError: (error) => {
              setMessageError(error.message);
            },
          },
        );
        setValueVIE('');
        setValueENG('');
      } else {
        setErrorsENG([MESSAGE_ERRORS.EXISTED]);
      }
    }
  };

  /**
   * @description function handle start testing with vocabularies of topic
   */
  const handleStartTest = useCallback(() => {
    setIsRandomQuizzes(true);
    if (id && vocabulariesAll) {
      onRandomQuizzes(vocabulariesAll);
      navigate(`${ROUTES.TESTING}/${id}`);
    }
  }, [vocabulariesAll, id, navigate, onRandomQuizzes]);

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

  // show errors of input vietnamese after delay 0.7s
  useEffect(() => {
    if (debouncedValueVIE) {
      const listErrorVIE = validation(debouncedValueVIE);
      setErrorsVIE(listErrorVIE);
    }
  }, [debouncedValueVIE]);

  // show errors of input english after delay 0.7s
  useEffect(() => {
    if (debouncedValueENG) {
      const listErrorENG = validation(debouncedValueENG);
      setErrorsENG(listErrorENG);
    }
  }, [debouncedValueENG]);

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
        onSubmit={handleAddNewVocabulary}
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
        <Input
          title='English (Native)'
          variant={INPUT_VARIANT.SECONDARY}
          onChange={handleOnChangeENG}
          value={valueENG!}
          errors={errorsENG}
          name='english'
          dataTestId='input-english'
          aria-label='enter english'
        />
        <Input
          title='In Vietnamese'
          variant={INPUT_VARIANT.SECONDARY}
          onChange={handleOnChangeVIE}
          value={valueVIE!}
          errors={errorsVIE}
          name='vietnamese'
          dataTestId='input-vietnamese'
          aria-label='enter vietnamese'
        />
        <Button
          type={BUTTON_TYPE.SUBMIT}
          loading={isLoadingCheckExisted}
          disabled={isLoadingCheckExisted}
        >
          Add
        </Button>
      </Box>
      <TableVocabulary
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        isAdding={isAdding}
        deletingById={{ [vocabularyId]: isDeleting }}
        vocabularies={vocabularies?.pages || []}
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
