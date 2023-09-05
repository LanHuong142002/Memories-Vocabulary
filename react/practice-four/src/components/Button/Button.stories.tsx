import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { BUTTON_SIZE, BUTTON_VARIANT } from '@constants';

// Components
import { Button } from '@components';

const meta: Meta<typeof Button> = {
  title: 'PracticeFour/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: [BUTTON_VARIANT.PRIMARY, BUTTON_VARIANT.SECONDARY, BUTTON_VARIANT.TERTIARY],
    },
    size: {
      control: { type: 'radio' },
      options: [BUTTON_SIZE.M, BUTTON_SIZE.S, BUTTON_SIZE.XS, BUTTON_SIZE.XXL],
    },
  },
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: BUTTON_VARIANT.PRIMARY,
    label: 'Submit',
    size: BUTTON_SIZE.XS,
  },
};

export const Disabled: Story = {
  args: {
    variant: BUTTON_VARIANT.PRIMARY,
    label: 'Back to Vocabulary List',
    size: BUTTON_SIZE.S,
    isDisabled: true,
  },
};

export default meta;
