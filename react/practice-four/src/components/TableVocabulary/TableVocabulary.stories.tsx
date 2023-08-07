import type { Meta, StoryFn } from '@storybook/react';

// Components
import { TableVocabulary, TableVocabularyProps } from '@components';

const meta: Meta<typeof TableVocabulary> = {
  title: 'PracticeFour/TableVocabulary',
  component: TableVocabulary,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<TableVocabularyProps> = () => {
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

  const handleOnClick = () => {
    console.log('clicked');
  };

  return <TableVocabulary vocabularies={mockData} onClick={handleOnClick} />;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
