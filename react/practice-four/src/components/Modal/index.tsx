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
  onClose: () => void;
  children: ReactNode;
}

const Modal = memo(({ opened, title, description, onClose, children, ...props }: ModalProps) => {
  const theme = useMantineTheme();

  return (
    <ModalMantine
      {...props}
      opened={opened}
      onClose={onClose}
      title={title}
      overlayProps={{
        color: theme.colors.white[4],
        opacity: 0.5,
        blur: '10px',
      }}
    >
      <Text sx={{ padding: '20px 0' }}>{description}</Text>
      <Flex h='35px' mt='xl' justify='end' gap='15px'>
        {children}
      </Flex>
    </ModalMantine>
  );
});

export default Modal;
