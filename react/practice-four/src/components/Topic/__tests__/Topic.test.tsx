import { fireEvent, render } from '@testing-library/react';

import { Topic } from '..';

describe('Test topic component', () => {
  const handleClick = jest.fn();

  it('Should render topic component', () => {
    const { container } = render(
      <Topic text='School' quantity={10} isAddNew={true} onClick={handleClick} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click topic component', () => {
    const { getByText } = render(<Topic text='School' onClick={handleClick} />);

    const topic = getByText('School');
    fireEvent.click(topic);

    expect(handleClick).toHaveBeenCalled();
  });
});
