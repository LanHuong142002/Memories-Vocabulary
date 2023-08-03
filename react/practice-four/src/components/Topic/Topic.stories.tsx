import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Topic } from '@components';

const meta: Meta<typeof Topic> = {
  title: 'PracticeFour/Topic',
  component: Topic,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'selected'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof Topic>;

export const Default: Story = {
  args: {
    name: 'School',
    variant: 'default',
    quantity: 10,
  },
};

export const Selected: Story = {
  args: {
    name: 'School',
    variant: 'selected',
    isAddNew: true,
  },
};

export default meta;
