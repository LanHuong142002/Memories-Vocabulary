import { fireEvent } from '@testing-library/react';

// Components
import { Topic } from '@components';

// Constants
import { TOPIC_VARIANT } from '@constants';

// Helpers
import { renderWithThemeProvider } from '@helpers';

describe('Test topic component', () => {
  const handleClick = jest.fn();

  const defaultProps = {
    id: '1',
    name: 'School',
    onClick: handleClick,
  };

  it('Should render topic component', () => {
    const { container } = renderWithThemeProvider(<Topic {...defaultProps} quantity={10} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render topic component without quantity', () => {
    const { container } = renderWithThemeProvider(
      <Topic {...defaultProps} variant={TOPIC_VARIANT.SELECTED} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click topic component', () => {
    const { getByText } = renderWithThemeProvider(
      <Topic {...defaultProps} quantity={10} isAddNew={true} />,
    );

    const topic = getByText('School');
    fireEvent.click(topic);

    expect(handleClick).toHaveBeenCalled();
  });
});
