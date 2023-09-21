import { memo } from 'react';
import { Flex, MantineTheme, Text } from '@mantine/core';

// Constants
import { TOPIC_VARIANT } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

interface TopicProps {
  id?: string;
  isAddNew?: boolean;
  quantity?: number;
  name: string;
  variant?: TOPIC_VARIANT;
  onClick: (id?: string) => void;
}

const Topic = memo(
  ({
    id,
    isAddNew = false,
    quantity = 0,
    name,
    variant = TOPIC_VARIANT.DEFAULT,
    onClick,
  }: TopicProps) => {
    const handleOncLick = () => {
      onClick(id);
    };

    return (
      <Flex
        className='topic'
        justify='center'
        align='center'
        style={{
          textAlign: 'center',
          boxSizing: 'border-box',
          padding: '15px 20px',
          width: '150px',
          height: '64px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        sx={(theme: MantineTheme) =>
          variant === TOPIC_VARIANT.SELECTED
            ? {
                zIndex: 1,
                position: 'relative',
                backgroundColor: theme.colors.none[0],
                border: `2px solid ${getColorScheme(
                  theme.colorScheme,
                  theme.colors.orange[0],
                  theme.colors.brown[0],
                )}`,
                color: getColorScheme(
                  theme.colorScheme,
                  theme.colors.orange[0],
                  theme.colors.brown[0],
                ),
                ':hover': {
                  opacity: theme.other.opacity.xs,
                },
              }
            : {
                backgroundColor: theme.colors.opacity[3],
                border: `2px solid ${theme.colors.opacity[4]}`,
                color: theme.colors.dark[3],
                ':hover': {
                  backgroundColor: theme.colors.white[1],
                },
              }
        }
        onClick={handleOncLick}
      >
        <Text
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Text>
        <Text sx={{ marginLeft: '5px' }}>{quantity > 0 ? `(${quantity})` : ''}</Text>

        {isAddNew && (
          <Flex
            justify='center'
            align='center'
            sx={(theme: MantineTheme) => ({
              position: 'absolute',
              zIndex: 2,
              width: '25px',
              height: '25px',
              top: '16px',
              left: '-13px',
              borderRadius: '20px',
              color: theme.colors.white[4],
              backgroundColor: getColorScheme(
                theme.colorScheme,
                theme.colors.orange[0],
                theme.colors.brown[0],
              ),
            })}
          >
            {'\u002b'}
          </Flex>
        )}
      </Flex>
    );
  },
);

export default Topic;
