import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProcessBar } from '@components';

const meta: Meta<typeof ProcessBar> = {
  title: 'PracticeFour/ProcessBar',
  component: ProcessBar,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof ProcessBar>;

export const Default: Story = {
  args: {
    step: 2,
    totalStep: 11,
  },
};

export default meta;
