import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableVocabulary } from '@components';
import { TableVocabularyProps } from '.';
import { MOCK_VOCABULARIES } from '@mocks';

const meta: Meta<TableVocabularyProps> = {
  title: 'PracticeFour/TableVocabulary',
  component: TableVocabulary,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const mockData = [
  [
    {
      id: '1',
      english: 'pen',
      vietnamese: 'cay but',
    },
    {
      id: '2',
      english: 'eraser',
      vietnamese: 'cuc tay',
    },
    {
      id: '3',
      english: 'book',
      vietnamese: 'cuon sach',
    },
    {
      id: '4',
      english: 'notebook',
      vietnamese: 'cuon vo',
    },
  ],
  MOCK_VOCABULARIES,
];

type Story = StoryObj<typeof TableVocabulary>;

export const Default: Story = {
  args: {
    vocabularies: mockData,
    isLoading: false,
    isAdding: false,
    isLoadingMore: false,
    deletingById: { 5: false },
  },
};

export default meta;
