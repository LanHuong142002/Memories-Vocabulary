import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Pagination } from '@components';

const meta: Meta<typeof Pagination> = {
  title: 'PracticeFour/Pagination',
  component: Pagination,
  argTypes: {
    onPrev: { action: 'clicked' },
    onNext: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export default meta;
