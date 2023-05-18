import { fireEvent, render } from '@testing-library/react';

// Components
import { Button, NotificationModal } from '@components';

describe('Testing Modal Notification component', () => {
  const handleOnClick = jest.fn();

  const defaultProps = {
    title: 'Title',
    description: 'Description',
    url: '/icons/error-icon.svg',
    onCancel: handleOnClick,
  };
  const children = (
    <Button label='Close' variant='tertiary' color='warning' size='lg' onClick={handleOnClick} />
  );

  it('Should renders modal notification with title and description correctly', () => {
    const { getByText } = render(
      <NotificationModal {...defaultProps}>{children}</NotificationModal>,
    );

    expect(getByText(defaultProps.title)).toBeInTheDocument();
    expect(getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('Should call onCancel when click button close', () => {
    const { getByText } = render(
      <NotificationModal {...defaultProps}>{children}</NotificationModal>,
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(handleOnClick).toHaveBeenCalled();
  });
});
