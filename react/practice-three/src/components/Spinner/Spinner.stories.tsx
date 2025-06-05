import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Spinner } from '@components';

export default {
  title: 'PracticeTwo/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];
