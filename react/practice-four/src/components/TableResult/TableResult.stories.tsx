import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableResult } from '@components';

// Mocks
import { mockTableResult } from '@mocks';

const meta: Meta<typeof TableResult> = {
  title: 'PracticeFour/TableResult',
  component: TableResult,
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
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

type Story = StoryObj<typeof TableResult>;

export const Default: Story = {
  args: {
    theme: 'light',
    result: mockTableResult,
  },
};

export default meta;
