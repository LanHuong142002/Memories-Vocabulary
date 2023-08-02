import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Topic } from '@components';

const meta: Meta<typeof Topic> = {
  title: 'PracticeFour/Button',
  component: Topic,
  argTypes: { onClick: { action: 'clicked' } },
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
    text: 'School',
    variant: 'default',
    quantity: 10,
  },
};

export const Selected: Story = {
  args: {
    text: 'School',
    variant: 'selected',
  },
};

export default meta;
