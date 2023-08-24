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
import { Button, Input, TableVocabulary, Typography } from '@components';
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
    onLoadMore,
  } = useContext(DictionaryContext);
  const [pages, setPages] = useState<number>(1);
  const [valueENG, setValueENG] = useState<string>('');
  const [errorsENG, setErrorsENG] = useState<string[]>([]);
  const [valueVIE, setValueVIE] = useState<string>('');
  const [errorsVIE, setErrorsVIE] = useState<string[]>([]);
  const debouncedValueENG = useDebounce<string | null>(valueENG, 700);
  const debouncedValueVIE = useDebounce<string | null>(valueVIE, 700);
  const [isDisabledButtonLoadMore, setIsDisabledButtonLoadMore] = useState<boolean>(
    !(vocabularies.length >= 5) && pages === 1,
  );
  const isDisabledButtonStartTest = useMemo(
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

  const handleLoadMore = useCallback(async () => {
    setPages((prev) => prev + 1);
    if (onLoadMore && id) {
      const lengthOfData = (await onLoadMore(id, pages + 1))!;

      if (lengthOfData < 20 && lengthOfData === 0) {
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
        <Button type='submit' label='Add' />
      </form>
      <TableVocabulary
        isLoading={isLoadingVocabulary}
        vocabularies={vocabularies}
        onClick={handleDeleteVocabulary}
      />
      <div className='actions-wrapper'>
        <Button label='Load More' onClick={handleLoadMore} isDisabled={isDisabledButtonLoadMore} />
        <Button
          label='Start Test'
          size='m'
          isDisabled={isDisabledButtonStartTest}
          onClick={handleStartTest}
        />
      </div>
    </Wrapper>
  );
};

export default VocabularyPage;
