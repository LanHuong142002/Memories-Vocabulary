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
    /**
     * @description function return 3 status of input
     *
     * @param theme from Mantine Theme
     *
     * @returns 3 status normal | success | failed
     */
    const getInputStyles = (theme: MantineTheme) => {
      switch (variant) {
        case INPUT_VARIANT.TERTIARY:
          if (error === undefined) {
            return {};
            // When error is not the empty string
            // It will return failed styles
          } else if (error !== '') {
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
            // This will return success styles
          } else {
            return {
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

        default:
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
        styles={(theme: MantineTheme) => {
          console.log(getInputStyles(theme));

          return getInputStyles(theme);
        }}
      />
    );
  },
);

export default Input;
