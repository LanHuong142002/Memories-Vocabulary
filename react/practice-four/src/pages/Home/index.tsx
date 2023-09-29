import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Loader } from '@mantine/core';

// Constants
import { ROUTES, TYPOGRAPHY_SIZE, TYPOGRAPHY_VARIANT } from '@constants';

// Stores
import { useTopicStores } from '@stores';

// Hooks
import { useMutationPostTopic, useTopics } from '@hooks';

// Components
import { AddNew } from '@pages';
import { Wrapper } from '@layouts';
import { Topic, Typography } from '@components';

const Home = () => {
  const navigate = useNavigate();

  // Queries
  const { data: topics, isLoading } = useTopics();
  const { isLoading: isAdding } = useMutationPostTopic();

  // Stores
  const { topics: topicsStore } = useTopicStores();

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
            <AddNew />
          </>
        )}
      </Flex>
    </Wrapper>
  );
};

export default Home;
