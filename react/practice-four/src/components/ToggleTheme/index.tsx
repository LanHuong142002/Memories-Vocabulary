import { memo } from 'react';
import { ActionIcon, Image, MantineTheme, useMantineColorScheme } from '@mantine/core';

// Images
import { moon, sun } from '@assets';

export const ToggleTheme = memo(() => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant='light'
      onClick={() => toggleColorScheme()}
      size='xl'
      title='Toggle color scheme'
      sx={(theme: MantineTheme) => ({
        backgroundColor: theme.colors.dark[0],
        ':hover': {
          backgroundColor: theme.colors.dark[0],
        },
      })}
    >
      <Image width='20px' height='20px' src={colorScheme === 'light' ? moon : sun} />
    </ActionIcon>
  );
});
