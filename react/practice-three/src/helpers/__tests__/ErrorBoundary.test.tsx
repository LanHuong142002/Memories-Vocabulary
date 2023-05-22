import { render } from '@testing-library/react';
import { ErrorBoundary } from '@helpers';

describe('Testing ErrorBoundary class', () => {
  it('Should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Content</div>
      </ErrorBoundary>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('Should render fallback when there is an error', () => {
    const ChildComponentWithError = ({ error }: { error: Error }) => {
      throw error;
    };
    const error = new Error('Test error');
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ChildComponentWithError error={error} />
      </ErrorBoundary>,
    );
    expect(getByText('Error occurred')).toBeInTheDocument();
  });
});
