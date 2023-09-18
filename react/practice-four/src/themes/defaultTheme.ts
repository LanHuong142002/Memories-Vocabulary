import { MantineThemeOverride } from '@mantine/core';

import DEFAULT_FONT_SIZES from './defaultFontSizes';
import DEFAULT_COLORS from './defaultColors';
import DEFAULT_FONT_WEIGHT from './defaultFontWeight';
import DEFAULT_LINE_HEIGHT from './defaultLineHeight';
import GLOBAL_STYLES from './globalStyles';

export const defaultTheme: MantineThemeOverride = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
  colors: DEFAULT_COLORS,
  fontSizes: DEFAULT_FONT_SIZES,
  other: {
    fontWeight: DEFAULT_FONT_WEIGHT,
    lineHeight: DEFAULT_LINE_HEIGHT,
  },
  globalStyles: GLOBAL_STYLES,
};
