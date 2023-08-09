import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableResult } from '@components';

// Mocks
import { mockTableResult } from '@mocks';

const meta: Meta<typeof TableResult> = {
  title: 'PracticeFour/TableResult',
  component: TableResult,
};

type Story = StoryObj<typeof TableResult>;

export const Default: Story = {
  args: {
    result: mockTableResult,
  },
};

export default meta;
