import { ChangeEvent, useState } from 'react';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, ProcessBar, Typography } from '@components';

// Styles
import './index.css';

const TestingPage = () => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // TODO: handle submit form
  const handleSubmit = () => {};

  return (
    <Wrapper
      className='testing'
      childrenTitle={
        <>
          <Typography size='xl'>Quiz</Typography>
          <Typography color='secondary' size='xs'>
            Give answers of <span className='testing-questions'>5 questions</span>. You have to
            translate English into Vietnamese
          </Typography>
        </>
      }
    >
      <form onSubmit={handleSubmit} className='testing-content'>
        <ProcessBar step={1} totalStep={6} />
        <Typography color='primary' size='m' textAlign='center'>
          {'Translate this "A" word in English, into Vietnamese:'}
        </Typography>
        <Input
          variant='tertiary'
          value={value}
          onChange={handleOnChange}
          errors={[]}
          title='Vietnamese'
          placeholder='Type your answer here'
        />
        <div className='testing-actions'>
          <Button type='submit' size='xs'>
            Next <span className='icon-next' />
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default TestingPage;
