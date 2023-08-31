import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Topic } from '@components';
import { TOPIC_VARIANT } from '@constants';

const meta: Meta<typeof Topic> = {
  title: 'PracticeFour/Topic',
  component: Topic,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: [TOPIC_VARIANT.SELECTED, TOPIC_VARIANT.DEFAULT],
    },
  },
};

type Story = StoryObj<typeof Topic>;

export const Default: Story = {
  args: {
    name: 'School',
    variant: TOPIC_VARIANT.DEFAULT,
    quantity: 10,
  },
};

export const Selected: Story = {
  args: {
    name: 'School',
    variant: TOPIC_VARIANT.SELECTED,
    isAddNew: true,
  },
};

export default meta;
