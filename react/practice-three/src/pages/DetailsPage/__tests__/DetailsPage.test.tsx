import { fireEvent, render } from '@testing-library/react';
import { DetailsPage } from '@pages';
import { act } from 'react-dom/test-utils';
import { MockContext } from '@helpers';

describe('Testing Details Page', () => {
  it('Should render component correctly', () => {
    const { container } = render(
      <MockContext>
        <DetailsPage />
      </MockContext>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should set the product state correctly', () => {
    const { container } = render(
      <MockContext>
        <DetailsPage />
      </MockContext>,
    );

    const input = container.querySelector('input[name="name"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, {
        target: { value: 'full name' },
      });
    });

    expect(input.value).toBe('full name');
  });

  it('Should render notification when have error and click close button', () => {
    const { getByText } = render(
      <MockContext>
        <DetailsPage />
      </MockContext>,
    );

    const button = getByText('Close');
    const notification = getByText('Ooops!');

    act(() => {
      fireEvent.click(button);
    });

    expect(notification).not.toBeInTheDocument();
  });
});
