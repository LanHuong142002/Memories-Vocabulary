import { MantineThemeOverride } from '@mantine/core';

import GLOBAL_STYLES from './globalStyles';
import COLORS from './colors';
import FONT_SIZES from './fontSizes';
import FONT_WEIGHTS from './fontWeights';
import LINE_HEIGHTS from './lineHeights';

import { Notification, Modal, Badge, TextInput, Button } from './components';

export const defaultTheme: MantineThemeOverride = {
  fontFamily: 'HelveticaNeue, Helvetica, Arial, sans-serif',
  colors: COLORS,
  fontSizes: FONT_SIZES,
  other: {
    fontWeight: FONT_WEIGHTS,
    lineHeight: LINE_HEIGHTS,
    opacity: {
      xxs: '0.5',
      xs: '0.7',
      md: '1',
    },
  },
  components: {
    Notification,
    Modal,
    Button,
    Badge,
    TextInput,
  },
  globalStyles: GLOBAL_STYLES,
};
