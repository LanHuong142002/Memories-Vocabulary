import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';

// Contexts
import { TopicContext } from '@contexts';

// Constants
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  BUTTON_VARIANT,
  INPUT_VARIANT,
  ROUTES,
  TOPIC_VARIANT,
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Helpers
import { validation } from '@helpers';

// Hooks
import { useDebounce } from '@hooks';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, Spinner, Topic, Typography } from '@components';

// Styles
import './index.css';

const Home = () => {
  const navigate = useNavigate();
  const { isLoadingTopic, topics, onAddTopic, onGetTopics } = useContext(TopicContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [topicValue, setTopicValue] = useState<string>('');
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(topicValue, 700);

  /**
   * @description function show hide overlay add new
   */
  const handleOpenOverlay = useCallback(() => {
    setIsOpenOverlay((prev) => !prev);
    setTopicValue('');
    setErrors([]);
  }, []);

  /**
   * @description function add new topic
   */
  const handleAddNewTopic = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listError = validation(topicValue, true);

    if (listError.length) {
      setErrors(listError);
    } else {
      onAddTopic({
        id: '', // id when posting, the MockAPI side will support generating the id
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
  const handleOpenTopic = useCallback(
    (id?: string) => {
      navigate(`${ROUTES.VOCABULARY}/${id}`);
    },
    [navigate],
  );

  useEffect(() => {
    if (debouncedValue) {
      const listError = validation(debouncedValue, true);
      setErrors(listError);
    }
  }, [debouncedValue]);

  useEffect(() => {
    onGetTopics();
  }, [onGetTopics]);

  return (
    <Wrapper
      className='home'
      childrenTitle={
        <>
          <Typography size={TYPOGRAPHY_SIZE.XL}>Add &amp; Select Topic</Typography>
          <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
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
            {topics.map(({ id, name, vocabularyCount }) => (
              <Topic
                id={id}
                key={`topic-${uuidv4()}`}
                name={name}
                quantity={vocabularyCount || 0}
                onClick={handleOpenTopic}
              />
            ))}
            <Topic
              variant={TOPIC_VARIANT.SELECTED}
              name='Add Topic'
              isAddNew={true}
              onClick={handleOpenOverlay}
            />
          </>
        )}
      </div>

      {isOpenOverlay && (
        <div className='overlay'>
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            size={BUTTON_SIZE.XXL}
            onClick={handleOpenOverlay}
          >
            &Chi;
          </Button>
          <form onSubmit={handleAddNewTopic} className='overlay-content'>
            <Typography size={TYPOGRAPHY_SIZE.XXL}>Add New Topic</Typography>
            <Input
              value={topicValue}
              variant={INPUT_VARIANT.PRIMARY}
              placeholder='Topic Name'
              onChange={handleOnChange}
              errors={errors}
              ariaLabel='enter topic'
            />
            <Button type={BUTTON_TYPE.SUBMIT} size={BUTTON_SIZE.M}>
              Done
            </Button>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
