import type { Meta, StoryFn } from '@storybook/react';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { ToggleTheme } from '@components';

const meta: Meta<typeof ToggleTheme> = {
  title: 'PracticeFour/ToggleTheme',
  component: ToggleTheme,
  tags: ['autodocs'],
};

const Template: StoryFn = () => (
  <ThemeProvider>
    <ToggleTheme />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {};

export default meta;
