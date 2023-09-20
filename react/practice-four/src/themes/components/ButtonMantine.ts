import { MantineTheme } from '@mantine/core';

// Constants
import { BOX_SIZING, ALIGN } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

const commonColor = (theme: MantineTheme) =>
  getColorScheme(theme.colorScheme, theme.colors.orange[0], theme.colors.brown[0]);

const Button = {
  styles: (theme: MantineTheme) => ({
    root: {
      color: getColorScheme(theme.colorScheme, theme.colors.orange[0], theme.colors.brown[0]),
      cursor: 'pointer',
      fontSize: theme.fontSizes.s,
      boxSizing: BOX_SIZING.BORDER_BOX,
      borderRadius: '3px',
      ':disabled': {
        opacity: theme.other.opacity.xxs,
      },
    },
    label: {
      fontWeight: theme.other.fontWeight.regular,
    },
  }),
  variants: {
    primary: (theme: MantineTheme) => ({
      root: {
        height: 'fit-content',
        padding: '10px 20px',
        span: {
          color: getColorScheme(theme.colorScheme, theme.colors.dark[3], theme.colors.white[4]),
        },
        backgroundColor: getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        ),
        ':disabled': {
          backgroundColor: getColorScheme(
            theme.colorScheme,
            theme.colors.orange[0],
            theme.colors.brown[0],
          ),
        },
      },
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        height: '25px',
        verticalAlign: 'middle',
        textAlign: ALIGN.CENTER,
        backgroundColor: theme.colors.none[0],
        border: `2px solid ${getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        )}`,
        ':disabled': {
          color: commonColor(theme),
          backgroundColor: theme.colors.none[0],
          border: `2px solid ${getColorScheme(
            theme.colorScheme,
            theme.colors.orange[0],
            theme.colors.brown[0],
          )}`,
        },
      },
    }),
    tertiary: (theme: MantineTheme) => ({
      root: {
        border: 'none',
        backgroundColor: theme.colors.none[0],
        ':disabled': {
          color: commonColor(theme),
          backgroundColor: theme.colors.none[0],
        },
      },
    }),
  },
};

export default Button;
