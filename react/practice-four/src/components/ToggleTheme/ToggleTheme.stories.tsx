import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ToggleTheme } from '@components';

const meta: Meta<typeof ToggleTheme> = {
  title: 'PracticeFour/ToggleTheme',
  component: ToggleTheme,
  argTypes: {
    onChange: { action: 'changed' },
    theme: {
      control: { type: 'radio' },
      options: ['dark', 'light'],
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

type Story = StoryObj<typeof ToggleTheme>;

export const Default: Story = {
  args: {
    theme: 'dark',
  },
};

export default meta;
