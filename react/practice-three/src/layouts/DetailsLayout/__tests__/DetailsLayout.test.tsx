import { render } from '@testing-library/react';
import { DetailsLayout } from '@layouts';

describe('Testing DetailsLayout', () => {
  it('Should renders DetailsTitle and DetailsBody correctly', () => {
    const title = <h1>Details Title</h1>;
    const body = <p>Details Body</p>;

    const { getByText, container } = render(<DetailsLayout title={title}>{body}</DetailsLayout>);

    expect(getByText('Details Title')).toBeInTheDocument();
    expect(getByText('Details Body')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
