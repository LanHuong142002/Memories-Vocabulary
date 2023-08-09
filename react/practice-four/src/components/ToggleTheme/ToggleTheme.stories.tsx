import type { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

// Components
import { ToggleTheme, ToggleThemeProps } from '@components';

const meta: Meta<typeof ToggleTheme> = {
  title: 'PracticeFour/ToggleTheme',
  component: ToggleTheme,
};

const Template: StoryFn<ToggleThemeProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setToggle(checked);
  };

  return <ToggleTheme isChecked={toggle} onChange={handleToggleTheme} />;
};

export const Primary = Template.bind({});
Primary.args = {};

export default meta;
