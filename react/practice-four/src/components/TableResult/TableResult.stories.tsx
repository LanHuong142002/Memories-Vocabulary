import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableResult } from '@components';

// Mocks
import { MOCK_TABLE_RESULT } from '@mocks';

const meta: Meta<typeof TableResult> = {
  title: 'PracticeFour/TableResult',
  component: TableResult,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof TableResult>;

export const Default: Story = {
  args: {
    result: MOCK_TABLE_RESULT,
  },
};

export default meta;
