import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { SPINNER_SIZE } from '@constants';

// Components
import { Spinner } from '@components';

const meta: Meta<typeof Spinner> = {
  title: 'PracticeFour/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: [SPINNER_SIZE.M, SPINNER_SIZE.S],
    },
  },
};

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export default meta;
