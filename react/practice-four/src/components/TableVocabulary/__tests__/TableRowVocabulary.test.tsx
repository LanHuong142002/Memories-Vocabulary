import { fireEvent, render } from '@testing-library/react';
import { ReactNode } from 'react';

// Components
import { TableRowVocabulary } from '@components';

describe('Test table row vocabulary component', () => {
  const defaultProps = {
    order: 1,
    id: '1',
    english: 'pen',
    vietnamese: 'cay but',
    isLoading: false,
    onClick: jest.fn(),
  };

  const Component = ({ children }: { children: ReactNode }) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  );

  it('Should render table row vocabulary component', () => {
    const { container, getByText } = render(
      <Component>
        <TableRowVocabulary {...defaultProps} />
      </Component>,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('pen')).toBeInTheDocument();
    expect(getByText('cay but')).toBeInTheDocument();
  });

  it('Should call onClick when click in action of table row vocabulary', () => {
    const handleOnClick = jest.fn();
    const { getByRole } = render(
      <Component>
        <TableRowVocabulary {...defaultProps} onClick={handleOnClick} />
      </Component>,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleOnClick).toBeCalled();
  });
});
