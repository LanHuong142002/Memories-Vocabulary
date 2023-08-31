import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button, Modal } from '@components';

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
        <Button variant='secondary' size='xs'>
          Cancel
        </Button>
        <Button variant='primary' size='xs'>
          Delete
        </Button>
      </>
    ),
  },
};

export default meta;
