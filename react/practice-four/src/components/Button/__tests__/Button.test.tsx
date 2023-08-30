import { cleanup, fireEvent, render } from '@testing-library/react';

// Constants
import { VARIANT } from '@constants';

// Components
import { Button } from '@components';

describe('Test button component', () => {
  afterEach(() => {
    cleanup();
  });

  const handleClick = jest.fn();

  const defaultProps = {
    label: 'Back to Vocabulary List',
    onClick: handleClick,
  };

  it('Should render button component', () => {
    const { container } = render(<Button {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click button component', () => {
    const { getByText } = render(<Button variant={VARIANT.SECONDARY} {...defaultProps} />);

    const button = getByText('Back to Vocabulary List');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('Should not call onClick when button disabled', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button {...defaultProps} onClick={handleClick} isDisabled={true} />,
    );

    const button = getByText('Back to Vocabulary List');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
