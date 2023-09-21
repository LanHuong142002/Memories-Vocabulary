import { MantineTheme } from '@mantine/core';

const Badge = {
  styles: (theme: MantineTheme) => ({
    root: {
      width: 'fit-content',
      height: '23px',
      padding: '2px 15px',
      borderRadius: '50px',
      fontSize: theme.fontSizes.xxs,
      fontWeight: theme.other.fontWeight.regular,
      lineHeight: '23px',
      color: theme.colors.dark[6],
    },
  }),
  variants: {
    success: (theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.colors.green[0],
      },
    }),
    failed: (theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.colors.red[0],
      },
    }),
    normal: (theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.colors.cyan[0],
      },
    }),
  },
};

export default Badge;
