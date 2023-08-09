import { ChangeEvent, useContext, useState } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Styles
import './index.css';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, Topic, Typography } from '@components';

const HomePage = () => {
  const { topics, onAddNewTopic } = useContext(DictionaryContext);
  const [topicValue, setTopicValue] = useState<string>('');
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);

  const handleOpenOverlay = () => {
    setIsOpenOverlay((prev) => !prev);
  };

  const handleAddNewTopic = () => {
    onAddNewTopic({
      name: topicValue,
      vocabularies: [],
    });
    handleOpenOverlay();
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopicValue(event.target.value);
  };

  const handleOpenTopic = () => {
    // TODO: feature open topic
  };

  return (
    <Wrapper className='home'>
      <div className='description'>
        <Typography size='xl'>Add &amp; Select Topic</Typography>
        <Typography color='secondary' size='xs'>
          Please choose a topic or create a new topic
        </Typography>
      </div>
      <div className='topics'>
        {topics.map(({ id, name, vocabularies }) => (
          <Topic
            key={`topic-${id}`}
            name={name}
            quantity={vocabularies!.length}
            onClick={handleOpenTopic}
          />
        ))}
        <Topic variant='selected' name='Add Topic' isAddNew={true} onClick={handleOpenOverlay} />
      </div>

      {isOpenOverlay && (
        <div className='overlay'>
          <Button variant='tertiary' size='xxl' onClick={handleOpenOverlay}>
            &Chi;
          </Button>
          <div className='overlay-content'>
            <Typography size='xxl'>Add New Topic</Typography>
            <Input
              value={topicValue}
              variant='primary'
              placeholder='Topic Name'
              onChange={handleOnChange}
            />
            <Button size='m' onClick={handleAddNewTopic}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;
