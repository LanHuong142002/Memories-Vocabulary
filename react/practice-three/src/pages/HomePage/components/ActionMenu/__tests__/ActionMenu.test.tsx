import { render, fireEvent } from '@testing-library/react';

// Components
import { ActionMenu } from '@pages';

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
    const { getByText } = render(<ActionMenu onEdit={onEdit} onDelete={onDelete} />);
    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalled();
  });
});
