import { render } from '@testing-library/react';
import { Label } from '..';

describe('Test label component', () => {
  it('Should render label component', () => {
    const { container, getByText } = render(<Label color='failed' name='60% Percentage' />);

    expect(container).toBeInTheDocument();
    expect(getByText('60% Percentage')).toBeInTheDocument();
  });
});
