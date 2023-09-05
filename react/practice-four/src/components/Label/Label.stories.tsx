import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Label } from '@components';
import { LABEL_COLOR } from '@constants';

const meta: Meta<typeof Label> = {
  title: 'PracticeFour/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'radio' },
      options: [LABEL_COLOR.SUCCESS, LABEL_COLOR.FAILED, LABEL_COLOR.NORMAL],
    },
  },
};

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    color: LABEL_COLOR.SUCCESS,
    name: '60% Percentage',
  },
};

export default meta;
