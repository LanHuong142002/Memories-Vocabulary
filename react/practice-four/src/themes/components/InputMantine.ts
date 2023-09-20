import { MantineTheme } from '@mantine/core';

// Constants
import { BOX_SIZING, POSITION, ALIGN } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

const commonInput = (theme: MantineTheme) => ({
  outline: 'none',
  boxSizing: BOX_SIZING.BORDER_BOX,
  backgroundColor: theme.colors.none[0],
  fontWeight: theme.other.fontWeight.regular,
  '::placeholder': {
    color: getColorScheme(theme.colorScheme, theme.colors.dark[0], theme.colors.dark[3]),
  },
});

const commonError = (theme: MantineTheme) => ({
  paddingLeft: '5px',
  fontWeight: theme.other.fontWeight.regular,
});

const TextInput = {
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
        ...commonInput(theme),
      },
      error: {
        ...commonError(theme),
        color: getColorScheme(theme.colorScheme, theme.colors.red[1], theme.colors.red[4]),
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        width: 'fit-content',
        position: POSITION.RELATIVE,
      },
      input: {
        width: '170px',
        height: '40px',
        padding: '0 5px',
        fontSize: theme.fontSizes.xs,
        borderRadius: '4px',
        border: `2px solid ${getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        )}`,
        ...commonInput(theme),
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
        ...commonError(theme),
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
        // 160px is width of error
        width: 'calc(100% - 160px)',
        backgroundColor: theme.colors.none[0],
        margin: 0,
        [`@media (min-width: ${theme.breakpoints.sm})`]: {
          // 90px is width of label
          width: 'calc(100% - 160px - 90px)',
        },
      },
      input: {
        height: '35px',
        border: 'none',
        alignItems: 'center',
        paddingLeft: '5px',
        color: theme.colors.dark[6],
        fontSize: theme.fontSizes.s,
        ...commonInput(theme),
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
        ...commonError(theme),
        width: '160px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0 3px 3px 0',
        color: getColorScheme(theme.colorScheme, theme.colors.red[1], theme.colors.red[4]),
      },
    }),
  },
};

export default TextInput;
