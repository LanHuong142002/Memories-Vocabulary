import { cleanup, render } from '@testing-library/react';
import { Label, LabelProps } from '@components';

describe('Testing Label component', () => {
  beforeEach(() => {
    cleanup();
  });

  const defaultProps = {
    text: '200',
    variant: 'primary',
  } as LabelProps;

  it('Should render Label component', () => {
    const { container } = render(<Label {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Testing props variant primary have class', () => {
    const { container } = render(<Label {...defaultProps} />);

    expect(container.querySelector('.label-primary')).toBeInTheDocument();
  });

  it('Should render Label component without variant', () => {
    const { container } = render(<Label text='200' />);

    expect(container).toMatchSnapshot();
  });
});
