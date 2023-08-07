// Components
import { Wrapper } from '@layouts';
import { Topic, Typography } from '@components';

// Styles
import './index.css';

export const HomePage = () => {
  const handleAddNewTopic = () => {
    // TODO: feature add new topic
  };

  const handleOpenTopic = () => {
    // TODO: feature open topic
  };

  return (
    <Wrapper className='home'>
      <div className='description'>
        <Typography size='xl'>Add & Select Topic</Typography>
        <Typography color='secondary' size='xs'>
          Please choose a topic or create a new topic
        </Typography>
      </div>
      <div className='topics'>
        <Topic name='School' onClick={handleOpenTopic} />
        <Topic variant='selected' name='Add Topic' isAddNew={true} onClick={handleAddNewTopic} />
      </div>
    </Wrapper>
  );
};
