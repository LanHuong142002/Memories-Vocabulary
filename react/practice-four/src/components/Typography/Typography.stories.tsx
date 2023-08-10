import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Typography } from '@components';

const meta: Meta<typeof Typography> = {
  title: 'PracticeFour/Typography',
  component: Typography,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    tagName: {
      control: { type: 'radio' },
      options: ['p', 'span'],
    },
  },
};

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'lorem',
    color: 'primary',
    tagName: 'p',
    size: 'xs',
  },
};

export default meta;
