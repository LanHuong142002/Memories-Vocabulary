import { MantineTheme } from '@mantine/core';

// Helpers
import { getColorScheme } from '@helpers';

const GLOBAL_STYLES = (theme: MantineTheme) => ({
  body: {
    ...theme.fn.fontStyles(),
    fontSize: theme.fontSizes.m,
    color: theme.colors.dark[3],
    backgroundColor: getColorScheme(theme.colorScheme, theme.colors.dark[4], theme.colors.white[3]),
  },
});

export default GLOBAL_STYLES;
