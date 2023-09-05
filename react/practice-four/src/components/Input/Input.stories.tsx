import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Input } from '@components';
import { INPUT_VARIANT } from '@constants';

const meta: Meta<typeof Input> = {
  title: 'PracticeFour/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    variant: {
      control: { type: 'radio' },
      options: [INPUT_VARIANT.PRIMARY, INPUT_VARIANT.SECONDARY, INPUT_VARIANT.TERTIARY],
    },
  },
};

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: INPUT_VARIANT.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: INPUT_VARIANT.SECONDARY,
  },
};

export const Tertiary: Story = {
  args: {
    placeholder: 'Enter name...',
    variant: INPUT_VARIANT.TERTIARY,
    title: 'Vietnamese',
  },
};

export default meta;
