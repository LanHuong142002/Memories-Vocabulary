import { render } from '@testing-library/react';

// Components
import { ProcessBar } from '@components';

describe('Test process bar component', () => {
  it('Should render process bar component', () => {
    const { container, getByText } = render(<ProcessBar step={2} totalStep={10} />);

    expect(container).toBeInTheDocument();
    expect(getByText('2 of 10')).toBeInTheDocument();
  });

  it('Should render total step of the param step passes to component more than total step', () => {
    const { container, getByText } = render(<ProcessBar step={12} totalStep={10} />);

    expect(container).toBeInTheDocument();
    expect(getByText('10 of 10')).toBeInTheDocument();
  });
});
