import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '@components';

const meta: Meta<typeof Button> = {
  title: 'PracticeFour/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'radio' },
      options: ['xs', 's', 'm'],
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

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'primary',
    label: 'Submit',
    size: 'xs',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Back to Vocabulary List',
    size: 's',
    isDisabled: true,
  },
};

export default meta;
