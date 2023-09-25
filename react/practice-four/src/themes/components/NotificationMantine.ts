import { MantineTheme } from '@mantine/core';

// Helpers
import { getColorScheme } from '@helpers';

const Notification = {
  styles: (theme: MantineTheme) => ({
    root: {
      width: '350px',
      backgroundColor: getColorScheme(
        theme.colorScheme,
        theme.colors.dark[2],
        theme.colors.white[4],
      ),
    },
    title: {
      fontWeight: theme.other.fontWeight.bold,
    },
    icon: {
      backgroundColor: theme.colors.red[2],
    },
    description: {
      color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
    },
  }),
};

export default Notification;
