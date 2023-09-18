import { MantineThemeOverride } from '@mantine/core';

import GLOBAL_STYLES from './globalStyles';
import DEFAULT_COLORS from './defaultColors';
import DEFAULT_FONT_SIZES from './defaultFontSizes';
import DEFAULT_FONT_WEIGHTS from './defaultFontWeights';
import DEFAULT_LINE_HEIGHTS from './defaultLineHeights';

export const defaultTheme: MantineThemeOverride = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
  colors: DEFAULT_COLORS,
  fontSizes: DEFAULT_FONT_SIZES,
  other: {
    fontWeight: DEFAULT_FONT_WEIGHTS,
    lineHeight: DEFAULT_LINE_HEIGHTS,
  },
  globalStyles: GLOBAL_STYLES,
};
