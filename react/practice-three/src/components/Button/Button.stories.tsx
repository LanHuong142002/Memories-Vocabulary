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
  label: 'Edit',
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
  label: 'Edit',
  variant: 'secondary',
  color: 'warning',
  type: 'button',
};
Secondary.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];

export const Disable = Template.bind({});
Disable.args = {
  label: 'Edit',
  variant: 'secondary',
  color: 'warning',
  isDisabled: true,
};
Disable.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];

export const Loading = Template.bind({});
Loading.args = {
  variant: 'secondary',
  color: 'warning',
  isLoading: true,
};
Loading.decorators = [
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];
