import type { Meta, StoryFn } from '@storybook/react';

// Components
import { TableRowVocabulary, TableRowVocabularyProps } from '@components';

const meta: Meta<typeof TableRowVocabulary> = {
  title: 'PracticeFour/TableRowVocabulary',
  component: TableRowVocabulary,
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

const Template: StoryFn<TableRowVocabularyProps> = () => {
  const handleOnClick = () => {
    console.log('clicked');
  };

  return <TableRowVocabulary english='pen' vietnamese='cay but' id={1} onClick={handleOnClick} />;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
