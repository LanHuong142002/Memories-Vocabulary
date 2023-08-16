import { useNavigate, useParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect, useContext } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { validation } from '@helpers';

// Constants
import { ROUTES } from '@constants';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { Button, Input, TableVocabulary, Typography } from '@components';
import { Wrapper } from '@layouts';

// Styles
import './index.css';

interface Translation extends Pick<Vocabulary, 'english' | 'vietnamese'> {}

const VocabularyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onGetVocabularies, onAddVocabulary, onDeleteVocabulary, vocabularies } =
    useContext(DictionaryContext);
  const [errorsEng, setErrorsEng] = useState<string[]>([]);
  const [errorsViet, setErrorsViet] = useState<string[]>([]);
  const [translation, setTranslation] = useState<Translation>({
    english: '',
    vietnamese: '',
  });
  const debouncedValue = useDebounce<Translation>(translation, 700);

  /**
   * @description function onchange to get value from input
   *
   * @param {Event} event of inputs
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTranslation({ ...translation, [name]: value });
  };

  /**
   * @description function add new vocabulary
   *
   * @param {Event} event is event of form
   */
  const handleAddNewVocabulary = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddVocabulary(id!, {
      id: '',
      ...translation,
    });
    setTranslation({
      english: '',
      vietnamese: '',
    });
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

  useEffect(() => {
    const listErrorEng = validation(debouncedValue.english);
    setErrorsEng(listErrorEng);

    const listErrorViet = validation(debouncedValue.vietnamese);
    setErrorsViet(listErrorViet);
  }, [debouncedValue.english, debouncedValue.vietnamese]);

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
          onChange={handleOnChange}
          value={translation.english}
          errors={errorsEng}
          name='english'
        />
        <Input
          title='In Vietnamese'
          variant='secondary'
          onChange={handleOnChange}
          value={translation.vietnamese}
          errors={errorsViet}
          name='vietnamese'
        />
        <Button type='submit' label='Add' />
      </form>
      <TableVocabulary vocabularies={vocabularies} onClick={handleDeleteVocabulary} />
    </Wrapper>
  );
};

export default VocabularyPage;
