import { MantineTheme } from '@mantine/core';

// Helpers
import { getColorScheme } from '@helpers';

// Constants
import { TEXT_TRANSFORM } from '@constants';

const Text = {
  variants: {
    primary: (theme: MantineTheme) => ({
      root: {
        color: getColorScheme(theme.colorScheme, theme.colors.white[4], theme.colors.dark[3]),
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        color: getColorScheme(theme.colorScheme, theme.colors.dark[0], theme.colors.dark[3]),
      },
    }),
    tertiary: (theme: MantineTheme) => ({
      root: {
        color: theme.colors.dark[6],
      },
    }),
    highlight: (theme: MantineTheme) => ({
      root: {
        color: theme.colors.dark[3],
        textTransform: TEXT_TRANSFORM.UPPERCASE,
        padding: '3px',
        borderRadius: '3px',
        backgroundColor: theme.colors.yellow[1],
        border: `1px solid ${theme.colors.yellow[0]}`,
      },
    }),
  },
  sizes: {
    xxs: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xxs,
      },
    }),
    xs: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xs,
      },
    }),
    s: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.s,
      },
    }),
    m: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.m,
      },
    }),
    l: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.l,
      },
    }),
    xl: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xl,
      },
    }),
    xxl: (theme: MantineTheme) => ({
      root: {
        fontSize: theme.fontSizes.xxl,
      },
    }),
  },
};

export default Text;
