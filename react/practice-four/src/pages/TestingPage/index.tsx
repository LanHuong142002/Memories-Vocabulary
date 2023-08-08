import { useState, ChangeEvent } from 'react';

import './index.css';

import { Button, Input, Typography } from '@components';
import { Vocabulary } from '@interfaces';
import { Wrapper } from '@layouts';

interface Translation extends Pick<Vocabulary, 'english' | 'vietnamese'> {}

export const TestingPage = () => {
  const [translation, setTranslation] = useState<Translation>({
    english: '',
    vietnamese: '',
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTranslation({ ...translation, [name]: value });
  };

  const handleAddNewVocabulary = () => {};

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
    </Wrapper>
  );
};
