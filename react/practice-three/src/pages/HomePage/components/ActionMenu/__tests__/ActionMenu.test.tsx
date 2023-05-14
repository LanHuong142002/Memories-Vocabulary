import { render, fireEvent } from '@testing-library/react';
import { ActionMenu } from '@pages';
import { Context, ModalContext } from '@contexts';

describe('Testing Action Menu component', () => {
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  it('Should call onEdit when Edit button is clicked', () => {
    const { getByText } = render(<ActionMenu onEdit={onEdit} onDelete={onDelete} />);
    const editButton = getByText('Edit');

    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalled();
  });

  it('Should call onDelete and show notification modal when Delete button is clicked', () => {
    const contextValue: Context = {
      showHideItemModal: jest.fn(),
      showHideNotificationModal: jest.fn(),
      showHideErrorsModal: jest.fn(),
      itemModal: false,
      notificationModal: false,
      errorsModal: {
        status: false,
        message: '',
      },
    };

    const { getByText } = render(
      <ModalContext.Provider value={contextValue}>
        <ActionMenu onEdit={onEdit} onDelete={onDelete} />
      </ModalContext.Provider>,
    );
    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);

    expect(contextValue.showHideNotificationModal).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
