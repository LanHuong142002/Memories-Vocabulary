import { ChangeEvent, memo } from 'react';

// Constants
import { INPUT_VARIANT } from '@constants';

// Styles
import { MantineTheme, TextInput, TextInputProps } from '@mantine/core';

interface Props extends TextInputProps {
  dataTestId?: string;
  autoComplete?: string;
  error?: string | undefined;
  variant?: INPUT_VARIANT;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(
  ({
    error,
    dataTestId,
    autoComplete = 'off',
    variant = INPUT_VARIANT.PRIMARY,
    ...props
  }: Props) => {
    const getInputStyles = (theme: MantineTheme) => {
      if (variant === INPUT_VARIANT.TERTIARY && error === undefined) {
        return {};
      } else if (variant !== INPUT_VARIANT.TERTIARY) {
        return {};
      } else {
        return error !== ''
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
            };
      }
    };

    return (
      <TextInput
        {...props}
        variant={variant}
        data-testid={dataTestId}
        autoComplete={autoComplete}
        error={error}
        styles={(theme: MantineTheme) => getInputStyles(theme)}
      />
    );
  },
);

export default Input;
