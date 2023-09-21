import { memo } from 'react';
import { Progress, useMantineTheme } from '@mantine/core';

// Helpers
import { calculateStepLevel } from '@helpers';

interface ProcessBarProps {
  step: number;
  totalStep: number;
}

const ProcessBar = memo(({ step, totalStep }: ProcessBarProps) => {
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
    />
  );
});

export default ProcessBar;
