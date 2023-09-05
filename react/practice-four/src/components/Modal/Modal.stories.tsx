import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button, Modal } from '@components';
import { BUTTON_SIZE, BUTTON_VARIANT } from '@constants';

const meta: Meta<typeof Modal> = {
  title: 'PracticeFour/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    onCloseModal: { action: 'clicked' },
  },
};

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Confirm Delete',
    description: 'Are you sure to delete this vocabulary?',
    children: (
      <>
        <Button variant={BUTTON_VARIANT.SECONDARY} size={BUTTON_SIZE.XS}>
          Cancel
        </Button>
        <Button variant={BUTTON_VARIANT.PRIMARY} size={BUTTON_SIZE.XS}>
          Delete
        </Button>
      </>
    ),
  },
};

export default meta;
