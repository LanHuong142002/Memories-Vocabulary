// Helpers
import { calculateStepLevel } from '@helpers';

// Styles
import './index.css';
import { memo } from 'react';

interface ProcessBarProps {
  step: number;
  totalStep: number;
}

const ProcessBar = memo(({ step, totalStep }: ProcessBarProps) => {
  const limitStep = step > totalStep ? totalStep : step;
  const percent = (limitStep / totalStep) * 100;

  return (
    <div className='process-wrapper'>
      <div
        className={`process process-${calculateStepLevel(step, totalStep)}`}
        style={{ width: `${percent}%` }}
      >
        {`${limitStep} of ${totalStep}`}
      </div>
    </div>
  );
});

export default ProcessBar;
