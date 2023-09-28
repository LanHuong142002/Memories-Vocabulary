import { ChangeEvent, memo } from 'react';

// Constants
import { INPUT_VARIANT } from '@constants';

// Styles
import { MantineTheme, TextInput, TextInputProps } from '@mantine/core';

interface Props extends TextInputProps {
  dataTestId?: string;
  autoComplete?: string;
  error?: string;
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
    /**
     * @description function return status of input
     *
     * @param theme from Mantine Theme
     *
     * @returns 3 status normal | failed
     */
    const getInputStyles = (theme: MantineTheme) => {
      if (variant === INPUT_VARIANT.TERTIARY && error !== '') {
        return {
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
        };
        // This will return default styles
      } else {
        return {};
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
