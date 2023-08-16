import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

// Contexts
import { DictionaryContext } from '@contexts';

// Constants
import { ROUTES } from '@constants';

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
  const navigate = useNavigate();
  const { isLoadingTopic, topics, onAddTopic } = useContext(DictionaryContext);
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
    const listError = validation(topicValue, true);

    if (listError.length) {
      setErrors(listError);
    } else {
      onAddTopic({
        id: '1',
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

  /**
   * @description function handle open topic with vocabularies
   *
   * @param {string} id is id of topic
   */
  const handleOpenTopic = (id?: string) => {
    navigate(`${ROUTES.TESTING}/${id}`);
  };

  useEffect(() => {
    if (debouncedValue) {
      const listError = validation(debouncedValue, true);
      setErrors(listError);
    }
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
        {isLoadingTopic ? (
          <Spinner />
        ) : (
          <>
            {topics.map(({ id, name, vocabularies }) => (
              <Topic
                id={id}
                key={`topic-${id}`}
                name={name}
                quantity={vocabularies?.length || 0}
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
