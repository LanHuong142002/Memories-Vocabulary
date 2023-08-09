import { ChangeEvent, useContext, useEffect, useState } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Helpers
import { validation } from '@helpers';

// Hooks
import { useDebounce } from '@hooks';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, Spinner, Topic, Typography } from '@components';

// Styles
import './index.css';

const HomePage = () => {
  const { isLoading, topics, onAddNewTopic } = useContext(DictionaryContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [topicValue, setTopicValue] = useState<string>('');
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(topicValue, 700);

  /**
   * @description function show hide overlay add new
   */
  const handleOpenOverlay = () => {
    setIsOpenOverlay((prev) => !prev);
    setTopicValue('');
    setErrors([]);
  };

  /**
   * @description function add new topic
   */
  const handleAddNewTopic = () => {
    const listError = validation(topicValue);

    if (listError.length) {
      setErrors(listError);
    } else {
      onAddNewTopic({
        name: topicValue,
        vocabularies: [],
      });
      handleOpenOverlay();
    }
  };

  /**
   * @description function get value from input
   *
   * @param {Event} event of input element
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopicValue(event.target.value);
  };

  const handleOpenTopic = () => {
    // TODO: feature open topic
  };

  useEffect(() => {
    const listError = validation(debouncedValue);
    setErrors(listError);
  }, [debouncedValue]);

  return (
    <Wrapper
      className='home'
      childrenTitle={
        <>
          <Typography size='xl'>Add &amp; Select Topic</Typography>
          <Typography color='secondary' size='xs'>
            Please choose a topic or create a new topic
          </Typography>
        </>
      }
    >
      <div className='topics'>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {topics.map(({ id, name, vocabularies }) => (
              <Topic
                id={id!}
                key={`topic-${id}`}
                name={name}
                quantity={vocabularies!.length}
                onClick={handleOpenTopic}
              />
            ))}
            <Topic
              variant='selected'
              name='Add Topic'
              isAddNew={true}
              onClick={handleOpenOverlay}
            />
          </>
        )}
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
              errors={errors}
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
