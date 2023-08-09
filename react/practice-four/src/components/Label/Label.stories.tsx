import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Label } from '@components';

const meta: Meta<typeof Label> = {
  title: 'PracticeFour/Label',
  component: Label,
  argTypes: {
    color: {
      control: { type: 'radio' },
      options: ['success', 'failed', 'normal'],
    },
  },
};

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    color: 'success',
    name: '60% Percentage',
  },
};

export default meta;
