import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Notification } from '@components';

const meta: Meta<typeof Notification> = {
  title: 'PracticeFour/Notification',
  component: Notification,
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '10px', backgroundColor: 'gray' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    title: 'Something wrong',
    description: 'error',
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    title: 'Something wrong',
    description: 'error',
    theme: 'dark',
  },
};

export default meta;
