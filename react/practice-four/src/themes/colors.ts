import { MantineThemeOverride } from '@mantine/core';

const COLORS: Partial<MantineThemeOverride['colors']> = {
  dark: ['#ddd', '#888', '#555', '#333', '#1a1b1e', '#25262b', '#000'],
  gray: ['#868e96', '#786f6f', '#343a40'],
  white: ['#f9f9f9', '#e8e8e8', '#f5f5f5', '#f3f4f8', '#fff'],
  red: ['#f2dede', '#f76b6b', '#d9534f', '#a94442', '#f30000'],
  green: ['#dff0d8', '#5cb85c'],
  cyan: ['#d9edf7', '#5bc0de'],
  orange: ['#ffca9e', '#f0ad4e', '#ff7300'],
  yellow: ['#faebcc', '#fcf8e3'],
  brown: ['#6b3000'],
  opacity: [
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.8',
    'rgba(255, 255, 255, 0.15)',
    'rgba(243, 244, 248, 0.65)',
    'rgba(0, 0, 0, 0.1)',
    'rgba(56, 67, 84, 0.05)',
  ],
  none: ['transparent'],
};

export default COLORS;
