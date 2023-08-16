import { useNavigate, useParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect, useContext } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

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
  const { onGetVocabularies, onAddVocabulary, onDeleteVocabulary, vocabularies } =
    useContext(DictionaryContext);
  const [valueENG, setValueENG] = useState<string>('');
  const [errorsENG, setErrorsENG] = useState<string[]>([]);

  const [valueVIE, setValueVIE] = useState<string>('');
  const [errorsVIE, setErrorsVIE] = useState<string[]>([]);

  /**
   * @description function onchange to get value from input english
   *
   * @param {Event} event of inputs
   */
  const handleOnChangeENG = (event: ChangeEvent<HTMLInputElement>) => {
    setValueENG(event.target.value);
    setErrorsENG(validation(event.target.value));
  };

  /**
   * @description function onchange to get value from input vietnamese
   *
   * @param {Event} event of inputs
   */
  const handleOnChangeVIE = (event: ChangeEvent<HTMLInputElement>) => {
    setValueVIE(event.target.value);
    setErrorsVIE(validation(event.target.value));
  };

  /**
   * @description function add new vocabulary
   *
   * @param {Event} event is event of form
   */
  const handleAddNewVocabulary = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listErrorVIE = validation(valueVIE);
    const listErrorENG = validation(valueENG);
    setErrorsVIE(listErrorVIE);
    setErrorsENG(listErrorENG);

    if (!listErrorVIE.length && !listErrorENG.length) {
      onAddVocabulary(id!, {
        id: '',
        vietnamese: valueVIE,
        english: valueENG,
      });

      setValueVIE('');
      setValueENG('');
    }
  };

  /**
   * @description function delete a vocabulary
   *
   * @param {string} vocabularyId is id of vocabulary which is selected
   */
  const handleDeleteVocabulary = (vocabularyId: string) => {
    onDeleteVocabulary(id!, vocabularyId);
  };

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
          value={valueENG}
          errors={errorsENG}
          name='english'
        />
        <Input
          title='In Vietnamese'
          variant='secondary'
          onChange={handleOnChangeVIE}
          value={valueVIE}
          errors={errorsVIE}
          name='vietnamese'
        />
        <Button type='submit' label='Add' />
      </form>
      <TableVocabulary vocabularies={vocabularies} onClick={handleDeleteVocabulary} />
    </Wrapper>
  );
};

export default VocabularyPage;
