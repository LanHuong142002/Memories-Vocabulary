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
};
