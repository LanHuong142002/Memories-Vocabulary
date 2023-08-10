import React from 'react';
import { addons } from '@storybook/addons';
import { UPDATE_GLOBALS, STORY_ARGS_UPDATED } from '@storybook/core-events';
import type { Preview } from '@storybook/react';

// Styles
import '../src/styles/main.css';

let channel = addons.getChannel();
let theme = 'light';

const storyListener = (args) => {
  if (args.args.theme) {
    theme = args.args.theme;
    channel.emit(UPDATE_GLOBALS, {
      globals: {
        backgrounds:
          theme === 'light' ? { name: 'light', value: '#fff' } : { name: 'dark', value: '#1a1b1e' },
      },
    });
  }
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: theme,
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'dark',
          value: '#1a1b1e',
        },
      ],
    },
  },
  args: {
    theme: 'light',
  },
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className={theme} style={{ margin: '10px' }}>
          <Story />
        </div>
      );
    },
  ],
};

function setupBackgroundListener() {
  channel.removeListener(STORY_ARGS_UPDATED, storyListener);
  channel.addListener(STORY_ARGS_UPDATED, storyListener);
}

setupBackgroundListener();
export default preview;
