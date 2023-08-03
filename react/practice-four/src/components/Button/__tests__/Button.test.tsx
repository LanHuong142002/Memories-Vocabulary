import { cleanup, fireEvent, render } from '@testing-library/react';
import { Button } from '..';

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
    const { getByText } = render(<Button {...defaultProps} />);

    const button = getByText('Back to Vocabulary List');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('Should not call onClick when button disabled component', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button {...defaultProps} onClick={handleClick} isDisabled={true} />,
    );

    const button = getByText('Back to Vocabulary List');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
