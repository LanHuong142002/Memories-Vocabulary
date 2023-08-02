import { cleanup, fireEvent, render } from '@testing-library/react';
import { Button } from '..';

describe('Test button component', () => {
  afterEach(() => {
    cleanup();
  });

  const handleClick = jest.fn();

  it('Should render button component', () => {
    const { container } = render(<Button onClick={handleClick} label='Back to Vocabulary List' />);

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click button component', () => {
    const { getByText } = render(<Button onClick={handleClick} label='Back to Vocabulary List' />);

    const button = getByText('Back to Vocabulary List');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('Should not call onClick when button disabled component', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick} label='Submit' isDisabled={true} />);

    const button = getByText('Submit');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
