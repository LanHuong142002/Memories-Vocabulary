import { useNavigate } from 'react-router-dom';
import { Box, Flex, Loader, MantineTheme, Overlay } from '@mantine/core';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

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

// Stores
import { useNotificationStores, useTopicStores } from '@stores';

// Helpers
import { validation } from '@helpers';

// Hooks
import { useDebounce, useMutationPostTopic, useTopics } from '@hooks';

// Components
import { Wrapper } from '@layouts';
import { Button, Input, Topic, Typography } from '@components';

const Home = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [topicValue, setTopicValue] = useState<string>('');
  const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(topicValue, 700);
  const { data: topics, isLoading } = useTopics();
  const { mutate, isLoading: isAdding } = useMutationPostTopic();
  const { topics: topicsStore } = useTopicStores();
  const { setMessageError } = useNotificationStores();

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
      mutate(
        {
          name: topicValue.trim(),
          vocabularies: [],
        },
        {
          onError: (error) => {
            setMessageError(error.message);
          },
        },
      );
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

  // show errors of input vietnamese after delay 0.7s
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
          <Typography size={TYPOGRAPHY_SIZE.XL}>Add &amp; Select Topic</Typography>
          <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.XS}>
            Please choose a topic or create a new topic
          </Typography>
        </>
      }
    >
      <Flex
        className='topics'
        justify='center'
        wrap='wrap'
        gap='30px'
        align='center'
        p='25px 0 15px 0'
        sx={{
          '.topic': {
            width: '150px',
          },
        }}
      >
        {isLoading ? (
          <Loader color='dark' size='md' />
        ) : (
          <>
            {(topics || topicsStore) &&
              (topics || topicsStore).map(({ id, name, vocabularies }) => (
                <Topic
                  id={id}
                  key={`topic-${id}`}
                  quantity={vocabularies?.length || 0}
                  onClick={handleOpenTopic}
                >
                  {name}
                </Topic>
              ))}
            {isAdding && (
              <Topic>
                <Flex justify='center' align='center'>
                  <Loader color='dark' size='xs' />
                </Flex>
              </Topic>
            )}
            <Topic variant={TOPIC_VARIANT.SELECTED} isAddNew={true} onClick={handleOpenOverlay}>
              Add Topic
            </Topic>
          </>
        )}
      </Flex>

      {isOpenOverlay && (
        <Overlay
          styles={{
            root: {
              height: '100%',
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 5,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'var(--overlay-opacity)',
              animation: 'opacityAnimation linear 0.2s',
            },
          }}
        >
          <Button
            variant={BUTTON_VARIANT.TERTIARY}
            size={BUTTON_SIZE.XXL}
            onClick={handleOpenOverlay}
            sx={(theme: MantineTheme) => ({
              top: '10px',
              right: '20px',
              position: 'absolute',
              fontSize: theme.fontSizes.xxl,
            })}
          >
            &Chi;
          </Button>
          <Box
            component='form'
            onSubmit={handleAddNewTopic}
            className='overlay-content'
            sx={{
              marginTop: '100px',
              minWidth: '300px',
              height: 'fit-content',
              position: 'absolute',
              top: '10%',
              left: '50%',
              borderRadius: '8px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography size={TYPOGRAPHY_SIZE.XXL} sx={{ textAlign: 'center' }}>
              Add New Topic
            </Typography>
            <Input
              value={topicValue}
              variant={INPUT_VARIANT.PRIMARY}
              placeholder='Topic Name'
              onChange={handleOnChange}
              errors={errors}
              aria-label='enter topic'
              sx={(theme: MantineTheme) => ({
                margin: '30px 0 10px 0',
                input: {
                  '::placeholder': {
                    fontSize: theme.fontSizes.l,
                  },
                },
              })}
            />
            <Button
              type={BUTTON_TYPE.SUBMIT}
              size={BUTTON_SIZE.M}
              sx={{
                width: '100%',
              }}
            >
              Done
            </Button>
          </Box>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default Home;
