import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Spinner } from '@components';

const meta: Meta<typeof Spinner> = {
  title: 'PracticeFour/Spinner',
  component: Spinner,
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'radio' },
      options: ['xs', 's', 'm'],
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

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export default meta;
