import { useNavigate, useParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect, useContext } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

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
  const { onGetVocabularies, vocabularies } = useContext(DictionaryContext);
  const [translation, setTranslation] = useState<Translation>({
    english: '',
    vietnamese: '',
  });

  /**
   * @description function onchange to get value from input
   *
   * @param {Event} event of inputs
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTranslation({ ...translation, [name]: value });
  };

  const handleAddNewVocabulary = () => {};

  const handleDeleteVocabulary = () => {};

  useEffect(() => {
    if (id) {
      onGetVocabularies(id);
    } else {
      navigate(ROUTES.HOME);
    }
  }, [id, navigate, onGetVocabularies]);

  return (
    <Wrapper
      className='testing'
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
      <form action='' className='form-add-new-vocabulary'>
        <Input
          title='English (Native)'
          variant='secondary'
          onChange={handleOnChange}
          value=''
          name='english'
        />
        <Input
          title='In Vietnamese'
          variant='secondary'
          onChange={handleOnChange}
          value=''
          name='vietnamese'
        />
        <Button type='submit' onClick={handleAddNewVocabulary} label='Add' />
      </form>
      <TableVocabulary vocabularies={vocabularies} onClick={handleDeleteVocabulary} />
    </Wrapper>
  );
};

export default VocabularyPage;
