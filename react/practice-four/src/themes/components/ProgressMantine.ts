import { MantineTheme } from '@mantine/core';

const Progress = {
  styles: (theme: MantineTheme) => ({
    root: {
      height: '20px',
      borderRadius: '4px',
      backgroundColor: theme.colors.white[2],
      boxShadow: `inset 0 1px 2px ${theme.colors.opacity[4]}`,
    },
    bar: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      backgroundImage: `linear-gradient(
        45deg,
        ${theme.colors.opacity[2]} 25%,
        transparent 25%,
        transparent 50%,
        ${theme.colors.opacity[2]} 50%,
        ${theme.colors.opacity[2]} 75%,
        transparent 75%,
        transparent
      )`,
      backgroundSize: '40px 40px',
      animation: '2s linear infinite identifier',
      '@keyframes identifier': {
        '0%': {
          backgroundPosition: '40px 0',
        },
        '100%': {
          backgroundPosition: '0 0',
        },
      },
    },
    label: {
      fontSize: theme.fontSizes.xxs,
      fontWeight: theme.other.fontWeight.regular,
      color: theme.colors.white[4],
    },
  }),
};

export default Progress;
