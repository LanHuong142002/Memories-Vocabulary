import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { InputFile } from '@components';

// Images
import UploadIcon from '@assets/icons/upload-icon.svg';
import CloudIcon from '@assets/icons/cloud-icon.svg';

export default {
  title: 'PracticeTwo/InputFile',
  component: InputFile,
  decorators: [
    (Story) => (
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof InputFile>;

const Template: ComponentStory<typeof InputFile> = (args) => {
  return <InputFile {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  text: 'Click to upload',
  size: 'md',
  url: UploadIcon,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  text: 'Upload photo',
  size: 'xxs',
  url: CloudIcon,
};
