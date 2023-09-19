import { MantineTheme } from '@mantine/core';

// Constants
import { BOX_SIZING, VERTICAL_ALIGN } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

const commonColor = (theme: MantineTheme) =>
  getColorScheme(theme.colorScheme, theme.colors.orange[0], theme.colors.brown[0]);

const commonButtonLabel = (theme: MantineTheme) => ({
  label: {
    fontWeight: theme.other.fontWeight.regular,
  },
});

const commonButtonRoot = (theme: MantineTheme) => ({
  color: commonColor(theme),
  cursor: 'pointer',
  fontSize: theme.fontSizes.s,
  boxSizing: BOX_SIZING.BORDER_BOX,
  borderRadius: '3px',
});

const Button = {
  variants: {
    primary: (theme: MantineTheme) => ({
      root: {
        ...commonButtonRoot(theme),
        height: 'fit-content',
        padding: '10px 20px',
        color: getColorScheme(theme.colorScheme, theme.colors.dark[3], theme.colors.white[4]),
        backgroundColor: getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        ),
        ':disabled': {
          opacity: theme.other.opacity.xxs,
          backgroundColor: getColorScheme(
            theme.colorScheme,
            theme.colors.orange[0],
            theme.colors.brown[0],
          ),
        },
      },
      ...commonButtonLabel(theme),
    }),
    secondary: (theme: MantineTheme) => ({
      root: {
        height: '25px',
        verticalAlign: 'middle',
        textAlign: VERTICAL_ALIGN.CENTER,
        backgroundColor: theme.colors.none[0],
        border: `2px solid ${getColorScheme(
          theme.colorScheme,
          theme.colors.orange[0],
          theme.colors.brown[0],
        )}`,
        ':disabled': {
          opacity: theme.other.opacity.xxs,
          color: commonColor(theme),
          backgroundColor: theme.colors.none[0],
          border: `2px solid ${getColorScheme(
            theme.colorScheme,
            theme.colors.orange[0],
            theme.colors.brown[0],
          )}`,
        },
      },
      ...commonButtonLabel(theme),
    }),
    tertiary: (theme: MantineTheme) => ({
      root: {
        border: 'none',
        backgroundColor: theme.colors.none[0],
        ':disabled': {
          opacity: theme.other.opacity.xxs,
          color: commonColor(theme),
          backgroundColor: theme.colors.none[0],
        },
      },
      ...commonButtonLabel(theme),
    }),
  },
};

export default Button;
