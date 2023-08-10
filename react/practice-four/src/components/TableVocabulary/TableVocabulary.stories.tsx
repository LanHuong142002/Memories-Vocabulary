import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TableVocabulary } from '@components';
import { TableVocabularyProps } from '.';

const meta: Meta<TableVocabularyProps> = {
  title: 'PracticeFour/TableVocabulary',
  component: TableVocabulary,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const mockData = [
  {
    id: 1,
    english: 'pen',
    vietnamese: 'cay but',
  },
  {
    id: 2,
    english: 'eraser',
    vietnamese: 'cuc tay',
  },
  {
    id: 3,
    english: 'book',
    vietnamese: 'cuon sach',
  },
  {
    id: 4,
    english: 'notebook',
    vietnamese: 'cuon vo',
  },
];

type Story = StoryObj<typeof TableVocabulary>;

export const Default: Story = {
  args: {
    vocabularies: mockData,
  },
};

export default meta;
