import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Button } from '@components';

export default {
  title: 'PracticeTwo/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Edit',
  size: 'md',
  variant: 'primary',
  type: 'button',
};
Primary.decorators = [
  (Story) => (
    <div style={{ padding: '3em', backgroundColor: '#6A6A6A' }}>
      <Story />
    </div>
  ),
];

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Add New Product',
  size: 'sm',
  variant: 'secondary',
  color: 'success',
  type: 'button',
};
Secondary.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];

export const Tertiary = Template.bind({});
Tertiary.args = {
  text: 'Cancel',
  size: 'lg',
  variant: 'tertiary',
  color: 'default',
  type: 'button',
};
Tertiary.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];
