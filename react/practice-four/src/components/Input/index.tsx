import { ChangeEvent, memo } from 'react';

// Constants
import { INPUT_VARIANT } from '@constants';

// Styles
import './index.css';
import { MantineTheme, TextInput, TextInputProps } from '@mantine/core';

interface Props extends TextInputProps {
  dataTestId?: string;
  errors?: string[] | null;
  variant?: INPUT_VARIANT;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(({ errors, dataTestId, variant = INPUT_VARIANT.PRIMARY, ...props }: Props) => (
  <TextInput
    {...props}
    variant={variant}
    data-testid={dataTestId}
    autoComplete='off'
    error={errors && errors.length >= 0 && <>{errors.map((error) => error)}</>}
    styles={(theme: MantineTheme) =>
      variant === INPUT_VARIANT.TERTIARY && errors
        ? errors.length >= 0
          ? {
              root: {
                backgroundColor: theme.colors.red[0],
              },
              error: {
                backgroundColor: theme.colors.red[1],
                color: theme.colors.opacity[1],
              },
              label: {
                color: theme.colors.red[3],
              },
            }
          : {
              root: {
                backgroundColor: theme.colors.green[0],
              },
              error: {
                display: 'none',
              },
              label: {
                color: theme.colors.dark[6],
              },
            }
        : {}
    }
  />
));

export default Input;
