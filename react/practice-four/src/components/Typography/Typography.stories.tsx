import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Typography } from '@components';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

const meta: Meta<typeof Typography> = {
  title: 'PracticeFour/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: [
        TYPOGRAPHY_SIZE.L,
        TYPOGRAPHY_SIZE.M,
        TYPOGRAPHY_SIZE.S,
        TYPOGRAPHY_SIZE.XL,
        TYPOGRAPHY_SIZE.XS,
        TYPOGRAPHY_SIZE.XXL,
        TYPOGRAPHY_SIZE.XXS,
        TYPOGRAPHY_SIZE.XXXL,
      ],
    },
    color: {
      control: { type: 'radio' },
      options: [
        TYPOGRAPHY_VARIANT.PRIMARY,
        TYPOGRAPHY_VARIANT.SECONDARY,
        TYPOGRAPHY_VARIANT.TERTIARY,
      ],
    },
    tagName: {
      control: { type: 'radio' },
      options: ['p', 'span'],
    },
  },
};

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'lorem',
    color: TYPOGRAPHY_VARIANT.PRIMARY,
    tagName: TYPOGRAPHY_TAG_NAME.P,
    size: TYPOGRAPHY_SIZE.XS,
  },
};

export default meta;
