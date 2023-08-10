import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Notification } from '@components';

const meta: Meta<typeof Notification> = {
  title: 'PracticeFour/Notification',
  component: Notification,
};

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    title: 'Something wrong',
    description: 'error',
  },
};

export default meta;
