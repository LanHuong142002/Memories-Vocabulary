import { useNavigate, useParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect, useContext, useCallback, useMemo } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { validation } from '@helpers';

// Constants
import { ROUTES } from '@constants';

// Components
import { Button, Input, Pagination, TableVocabulary, Typography } from '@components';
import { Wrapper } from '@layouts';

// Styles
import './index.css';

const VocabularyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoadingVocabulary,
    vocabularies,
    onGetVocabularies,
    onAddVocabulary,
    onDeleteVocabulary,
    onRandomQuizzes,
  } = useContext(DictionaryContext);
  const [pages, setPages] = useState<number>(1);
  const [valueENG, setValueENG] = useState<string>('');
  const [errorsENG, setErrorsENG] = useState<string[]>([]);
  const [valueVIE, setValueVIE] = useState<string>('');
  const [errorsVIE, setErrorsVIE] = useState<string[]>([]);
  const debouncedValueENG = useDebounce<string | null>(valueENG, 700);
  const debouncedValueVIE = useDebounce<string | null>(valueVIE, 700);
  const isDisabledButton = useMemo(
    () => !(vocabularies.length >= 5) && pages === 1,
    [vocabularies.length, pages],
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
  const handleAddNewVocabulary = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valueInputENG = (event.target[0] as HTMLInputElement).value;
    const valueInputVIE = (event.target[1] as HTMLInputElement).value;

    const listErrorVIE = validation(valueInputVIE);
    const listErrorENG = validation(valueInputENG);
    setErrorsVIE(listErrorVIE);
    setErrorsENG(listErrorENG);

    if (!listErrorVIE.length && !listErrorENG.length) {
      onAddVocabulary(id!, {
        id: '',
        vietnamese: valueInputVIE,
        english: valueInputENG,
      });

      setValueVIE('');
      setValueENG('');
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
  const handleDeleteVocabulary = useCallback(
    (vocabularyId: string) => {
      if (id) {
        onDeleteVocabulary(id, vocabularyId);
      }
    },
    [id, onDeleteVocabulary],
  );

  /**
   * @description function handle next pagination
   */
  const handleNext = useCallback(() => {
    if (vocabularies.length === 0 && pages !== 1) {
      setPages((prev) => prev);
    } else {
      setPages((prev) => prev + 1);
    }
  }, [pages, vocabularies]);

  /**
   * @description function handle prev pagination
   */
  const handlePrev = useCallback(() => {
    if (pages <= 1) {
      setPages(1);
    } else {
      setPages((prev) => prev - 1);
    }
  }, [pages]);

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
      onGetVocabularies(id, pages);
    } else {
      navigate(ROUTES.HOME);
    }
  }, [id, navigate, onGetVocabularies, pages]);

  return (
    <Wrapper
      className='vocabularies'
      childrenTitle={
        <>
          <Typography size='xl'>Make Vocabulary with Translation</Typography>
          <Typography color='secondary' size='xs'>
            Add <Typography tagName='span'>(Min 5)</Typography> word of ENGLISH and Translate it
            into VIETNAMESE.
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
        />
        <Input
          title='In Vietnamese'
          variant='secondary'
          onChange={handleOnChangeVIE}
          value={valueVIE!}
          errors={errorsVIE}
          name='vietnamese'
          dataTestId='input-vietnamese'
        />
        <Button type='submit' label='Add' />
      </form>
      <TableVocabulary
        isLoading={isLoadingVocabulary}
        vocabularies={vocabularies}
        onClick={handleDeleteVocabulary}
      />
      <Pagination onPrev={handlePrev} onNext={handleNext} />
      <div className='actions-wrapper'>
        <Button
          label='Start Test'
          size='m'
          isDisabled={isDisabledButton}
          onClick={handleStartTest}
        />
      </div>
    </Wrapper>
  );
};

export default VocabularyPage;
