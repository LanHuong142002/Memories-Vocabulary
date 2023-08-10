import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Input } from '@components';

const meta: Meta<typeof Input> = {
  title: 'PracticeFour/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
};

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: 'tertiary',
  },
};

export default meta;
