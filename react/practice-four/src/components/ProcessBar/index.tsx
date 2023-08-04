// Helpers
import { calculateStepLevel } from '@helpers';

// Styles
import './index.css';

interface ProcessBarProps {
  step: number;
  totalStep: number;
}

export const ProcessBar = ({ step, totalStep }: ProcessBarProps) => {
  const limitStep = step > totalStep ? totalStep : step;

  return (
    <div className='process-wrapper'>
      <div
        className={`process process-${calculateStepLevel(step, totalStep)}`}
        style={{ width: `${(limitStep / totalStep) * 100}%` }}
      >
        {`${limitStep} of ${totalStep}`}
      </div>
    </div>
  );
};
