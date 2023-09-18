import { MantineTheme } from '@mantine/core';

const commonButton = (theme: MantineTheme) => ({
  cursor: 'pointer',
  fontSize: theme.fontSizes.s,
  fontWeight: theme.other.fontWeight.light,
  borderRadius: '3px',
  boxSizing: 'border-box',
  ':disabled': {
    opacity: '0.6',
    cursor: 'default',
  },
});

const button = {
  variants: {
    primary: (theme: MantineTheme) => ({
      ...commonButton(theme),
      padding: '10px 20px',
      color: theme.colors.white[4],
      backgroundColor: theme.colors.brown[0],
    }),
  },
};

export default button;
