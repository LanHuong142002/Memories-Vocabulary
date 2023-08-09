import { useState, ChangeEvent, useContext } from 'react';

// Interfaces
import { Vocabulary } from '@interfaces';

// Components
import { Button, Input, TableVocabulary, Typography } from '@components';
import { Wrapper } from '@layouts';

// Styles
import './index.css';
import { DictionaryContext } from '@contexts';

interface Translation extends Pick<Vocabulary, 'english' | 'vietnamese'> {}

const VocabularyPage = () => {
  const { vocabularies } = useContext(DictionaryContext);
  const [translation, setTranslation] = useState<Translation>({
    english: '',
    vietnamese: '',
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTranslation({ ...translation, [name]: value });
  };

  const handleAddNewVocabulary = () => {};

  const handleDeleteVocabulary = () => {};

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
