import { useNavigate, useParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect, useContext, useCallback, useMemo } from 'react';

// Contexts
import { VocabularyContext } from '@contexts';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { validation } from '@helpers';

// Constants
import { MESSAGE_ERRORS, ROUTES } from '@constants';

// Components
import { Button, Input, Modal, TableVocabulary, Typography } from '@components';
import { Wrapper } from '@layouts';

// Styles
import './index.css';

const Vocabulary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoadingVocabularies,
    isLoadingMore,
    isAdding,
    deletingById,
    vocabularies,
    onGetVocabularies,
    onAddVocabulary,
    onDeleteVocabulary,
    onRandomQuizzes,
    onLoadMore,
    onCheckEnglishIsExisted,
  } = useContext(VocabularyContext);
  const [pages, setPages] = useState<number>(1);
  const [valueENG, setValueENG] = useState<string>('');
  const [errorsENG, setErrorsENG] = useState<string[]>([]);
  const [valueVIE, setValueVIE] = useState<string>('');
  const [errorsVIE, setErrorsVIE] = useState<string[]>([]);
  const debouncedValueENG = useDebounce<string | null>(valueENG, 700);
  const debouncedValueVIE = useDebounce<string | null>(valueVIE, 700);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const [vocabularyId, setVocabularyId] = useState<string>('');
  const [isDisabledButtonLoadMore, setIsDisabledButtonLoadMore] = useState<boolean>(false);
  const isDisabledButtonStartTest = useMemo(
    () => !(vocabularies.length >= 5) && pages === 1,
    [vocabularies.length, pages],
  );

  /**
   * @description function show hide modal confirm delete
   */
  const handleShowModalConfirm = useCallback(() => {
    setIsConfirmModal((prev) => !prev);
  }, []);

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
      setIsButtonLoading(true);
      const isExisted = await onCheckEnglishIsExisted(id, valueInputENG);

      if (!isExisted) {
        onAddVocabulary(id, {
          id: '',
          vietnamese: valueInputVIE,
          english: valueInputENG,
        });
        setValueVIE('');
        setValueENG('');
      } else {
        setErrorsENG([MESSAGE_ERRORS.EXISTED]);
      }
      setIsButtonLoading(false);
    }
  };

  /**
   * @description function handle start testing with vocabularies of topic
   */
  const handleStartTest = useCallback(() => {
    if (id) {
      onRandomQuizzes(id);
      navigate(`${ROUTES.TESTING}/${id}`);
    }
  }, [id, navigate, onRandomQuizzes]);

  /**
   * @description function delete a vocabulary
   *
   * @param {string} vocabularyId is id of vocabulary which is selected
   */
  const handleDeleteVocabulary = useCallback(() => {
    if (id) {
      onDeleteVocabulary(id, vocabularyId);
      setIsConfirmModal(false);
    }
  }, [id, onDeleteVocabulary, vocabularyId]);

  /**
   * @description function open confirm modal and get vocabulary id
   */
  const handleOpenConfirmModalInRow = useCallback(
    (id: string) => {
      handleShowModalConfirm();
      setVocabularyId(id);
    },
    [handleShowModalConfirm],
  );

  /**
   * @description function load more vocabularies
   */
  const handleLoadMore = useCallback(async () => {
    setPages((prev) => prev + 1);
    if (id) {
      const lengthOfData = (await onLoadMore(id, pages + 1))!;

      if (lengthOfData < 20 || lengthOfData === 0) {
        setIsDisabledButtonLoadMore(true);
      }
    }
  }, [id, onLoadMore, pages]);

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
    if (id) {
      onGetVocabularies(id);
    } else {
      navigate(ROUTES.HOME);
    }
  }, [id, navigate, onGetVocabularies]);

  return (
    <Wrapper
      className='vocabularies'
      childrenTitle={
        <>
          <Typography size='xl'>Make Vocabulary with Translation</Typography>
          <Typography color='secondary' size='xs'>
            Add{' '}
            <Typography className='highlight' tagName='span'>
              (Min 5)
            </Typography>{' '}
            words of ENGLISH and Translate it into VIETNAMESE.
          </Typography>
        </>
      }
    >
      <form onSubmit={handleAddNewVocabulary} className='form-add-new-vocabulary'>
        <Input
          title='English (Native)'
          variant='secondary'
          onChange={handleOnChangeENG}
          value={valueENG!}
          errors={errorsENG}
          name='english'
          dataTestId='input-english'
          ariaLabel='enter english'
        />
        <Input
          title='In Vietnamese'
          variant='secondary'
          onChange={handleOnChangeVIE}
          value={valueVIE!}
          errors={errorsVIE}
          name='vietnamese'
          dataTestId='input-vietnamese'
          ariaLabel='enter vietnamese'
        />
        <Button
          type='submit'
          label='Add'
          isLoading={isButtonLoading}
          isDisabled={isButtonLoading}
        />
      </form>
      <TableVocabulary
        isLoading={isLoadingVocabularies}
        isLoadingMore={isLoadingMore}
        isAdding={isAdding}
        deletingById={deletingById}
        vocabularies={vocabularies}
        onClick={handleOpenConfirmModalInRow}
      />
      <div className='actions-wrapper'>
        {vocabularies.length >= 20 && !isDisabledButtonLoadMore && (
          <Button className='button-load-more' label='Load More' onClick={handleLoadMore} />
        )}
        <Button
          label='Start Test'
          size='m'
          isDisabled={isDisabledButtonStartTest}
          onClick={handleStartTest}
        />
      </div>
      {isConfirmModal && (
        <div className='overlay-modal'>
          <Modal
            description='Are you sure to delete this vocabulary?'
            title='Confirm Delete'
            onCloseModal={handleShowModalConfirm}
          >
            <Button variant='secondary' size='xs' onClick={handleShowModalConfirm}>
              Cancel
            </Button>
            <Button variant='primary' size='xs' onClick={handleDeleteVocabulary}>
              Delete
            </Button>
          </Modal>
        </div>
      )}
    </Wrapper>
  );
};

export default Vocabulary;
