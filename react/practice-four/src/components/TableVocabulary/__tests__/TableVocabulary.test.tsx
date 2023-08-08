import { render } from '@testing-library/react';
import { TableVocabulary } from '..';

describe('Test table vocabulary component', () => {
  const handleOnClick = jest.fn();

  const defaultValue = {
    vocabularies: [
      {
        id: 1,
        english: 'pen',
        vietnamese: 'cay but',
      },
      {
        id: 2,
        english: 'eraser',
        vietnamese: 'cuc tay',
      },
      {
        id: 3,
        english: 'book',
        vietnamese: 'cuon sach',
      },
      {
        id: 4,
        english: 'notebook',
        vietnamese: 'cuon vo',
      },
    ],
  };

  it('Should render table vocabulary with list vocabularies', () => {
    const { container, getAllByRole, getByText } = render(
      <TableVocabulary {...defaultValue} onClick={handleOnClick} />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByRole('cell').length).toBe(16);
    expect(getAllByRole('row').length).toBe(5);
    expect(getByText('book')).toBeInTheDocument();
  });
});
