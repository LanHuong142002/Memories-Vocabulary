import { MantineTheme } from '@mantine/core';

// Constants
import { BOX_SIZING, POSITION, ALIGN } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

const TextInput = {
  styles: (theme: MantineTheme) => ({
    input: {
      outline: 'none',
      boxSizing: BOX_SIZING.BORDER_BOX,
      backgroundColor: theme.colors.none[0],
      fontWeight: theme.other.fontWeight.regular,
      '::placeholder': {
        fontSize: theme.fontSizes.xxs,
        color: getColorScheme(theme.colorScheme, theme.colors.dark[0], theme.colors.dark[3]),
        [`@media (min-width: ${theme.breakpoints.md})`]: {
          fontSize: theme.fontSizes.xs,
        },
      },
    },
    error: {
      paddingLeft: '5px',
      fontWeight: theme.other.fontWeight.regular,
    },
  }),
  variants: {
    primary: (theme: MantineTheme) => ({
      input: {
        border: 'none',
        height: '40px',
        textAlign: ALIGN.CENTER,
        fontSize: theme.fontSizes.l,
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
        borderBottom: `2px solid ${getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        )}`,
      },
      error: {
        color: getColorScheme(theme.colorScheme, theme.colors.red[1], theme.colors.red[4]),
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        width: '100%',
        position: POSITION.RELATIVE,
        [`@media (min-width: ${theme.breakpoints.xs})`]: {
          width: '170px',
        },
      },
      input: {
        height: '40px',
        padding: '0 5px',
        fontSize: theme.fontSizes.xs,
        borderRadius: '4px',
        border: `2px solid ${getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        )}`,
      },
      label: {
        width: 'max-content',
        position: POSITION.ABSOLUTE,
        padding: '0 5px',
        top: '-8px',
        backgroundColor: getColorScheme(
          theme.colorScheme,
          theme.colors.dark[5],
          theme.colors.white[4],
        ),
        fontWeight: theme.other.fontWeight.regular,
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99,
      },
      error: {
        color: getColorScheme(theme.colorScheme, theme.colors.red[1], theme.colors.red[4]),
      },
    }),
    tertiary: (theme: MantineTheme) => ({
      root: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.colors.white[2],
        height: '35px',
        borderRadius: '3px',
      },
      wrapper: {
        // 120px is width of error
        width: 'calc(100% - 120px)',
        backgroundColor: theme.colors.none[0],
        margin: 0,
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          // 90px is width of label
          width: 'calc(100% - 120px - 90px)',
        },
      },
      input: {
        height: '35px',
        border: 'none',
        alignItems: 'center',
        paddingLeft: '5px',
        color: theme.colors.dark[6],
        fontSize: theme.fontSizes.s,
      },
      label: {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colors.dark[6],
        fontWeight: theme.other.fontWeight.regular,
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          display: 'flex',
          width: '90px',
        },
      },
      error: {
        width: '120px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0 3px 3px 0',
        color: getColorScheme(theme.colorScheme, theme.colors.red[1], theme.colors.red[4]),
      },
    }),
  },
};

export default TextInput;
