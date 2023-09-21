import { getColorScheme } from '@helpers';
import { MantineTheme } from '@mantine/core';

const Modal = {
  styles: (theme: MantineTheme) => ({
    content: {
      minWidth: '300px',
      padding: '20px 25px',
      fontSize: theme.fontSizes.s,
      fontWeight: theme.other.fontWeight.regular,
      color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
      borderRadius: '4px',
      backgroundColor: getColorScheme(
        theme.colorScheme,
        theme.colors.dark[2],
        theme.colors.white[4],
      ),
      boxShadow: `0 2px 8px ${theme.colors.opacity[5]}`,
      border: `1px solid ${theme.colors.white[1]}`,
      [`@media (min-width: ${theme.breakpoints.sm})`]: {
        minWidth: '400px',
      },
    },
    title: {
      fontSize: theme.fontSizes.l,
      fontWeight: theme.other.fontWeight.bold,
    },
    header: {
      padding: 0,
      'button:hover': {
        backgroundColor: theme.colors.opacity[4],
      },
    },
    inner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      padding: 0,
    },
  }),
};

export default Modal;
