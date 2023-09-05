import { render } from '@testing-library/react';

// Components
import { Label } from '@components';
import { LABEL_COLOR } from '@constants';

describe('Test label component', () => {
  it('Should render label component', () => {
    const { container, getByText } = render(
      <Label color={LABEL_COLOR.FAILED} name='60% Percentage' />,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('60% Percentage')).toBeInTheDocument();
  });
});
