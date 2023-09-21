import { ReactNode, memo } from 'react';
import {
  Flex,
  Text,
  Modal as ModalMantine,
  ModalProps as ModalPropsMantine,
  useMantineTheme,
} from '@mantine/core';

interface ModalProps extends ModalPropsMantine {
  opened: boolean;
  title: string;
  description: string;
  onCloseModal: () => void;
  children: ReactNode;
}

const Modal = memo(
  ({ opened, title, description, onCloseModal, children, ...props }: ModalProps) => {
    const theme = useMantineTheme();

    return (
      <ModalMantine
        {...props}
        opened={opened}
        onClose={onCloseModal}
        title={title}
        overlayProps={{
          color: theme.colors.white[4],
          opacity: 0.5,
          blur: '10px',
        }}
      >
        <Text sx={{ padding: '20px 0' }}>{description}</Text>
        <Flex mt='xl' justify='end' gap='15px'>
          {children}
        </Flex>
      </ModalMantine>
    );
  },
);

export default Modal;
