import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableResult } from '@components';

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

const mockData = [
  {
    isSuccess: true,
    no: 1,
    native: 'pen',
    translation: 'cay but',
    answer: 'cay but',
  },
  {
    isSuccess: false,
    no: 2,
    native: 'book',
    translation: 'quyen sach',
    answer: 'cuon sach',
  },
  {
    isSuccess: true,
    no: 3,
    native: 'notebook',
    translation: 'quyen vo',
    answer: 'quyen vo',
  },
];

type Story = StoryObj<typeof TableResult>;

export const Default: Story = {
  args: {
    theme: 'light',
    result: mockData,
  },
};

export default meta;
