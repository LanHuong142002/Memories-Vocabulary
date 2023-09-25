import { memo } from 'react';
import { Progress, ProgressProps, useMantineTheme } from '@mantine/core';

// Helpers
import { calculateStepLevel } from '@helpers';

interface ProcessBarProps extends ProgressProps {
  step: number;
  totalStep: number;
}

const ProcessBar = memo(({ step, totalStep, ...props }: ProcessBarProps) => {
  const theme = useMantineTheme();
  const limitStep = step > totalStep ? totalStep : step;
  const percent = (limitStep / totalStep) * 100;

  return (
    <Progress
      size={24}
      sections={[
        {
          value: percent,
          color: calculateStepLevel(theme, step, totalStep),
          label: `${limitStep} of ${totalStep}`,
        },
      ]}
      {...props}
    />
  );
});

export default ProcessBar;
