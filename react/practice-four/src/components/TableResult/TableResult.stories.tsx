import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableResult } from '@components';

// Mocks

const meta: Meta<typeof TableResult> = {
  title: 'PracticeFour/TableResult',
  component: TableResult,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof TableResult>;

export const Default: Story = {
  args: {
    result: [
      {
        id: '1',
        isSuccess: true,
        english: 'pen',
        vietnamese: 'cay but',
        answer: 'cay but',
      },
      {
        id: '2',
        isSuccess: false,
        english: 'book',
        vietnamese: 'quyen sach',
        answer: 'cuon sach',
      },
      {
        id: '3',
        isSuccess: true,
        english: 'notebook',
        vietnamese: 'quyen vo',
        answer: 'quyen vo',
      },
    ],
  },
};

export default meta;
