import { render } from '@testing-library/react';

// Components
import { HomeLayout } from '@layouts';

describe('Testing DetailsLayout', () => {
  it('Should renders DetailsTitle and DetailsBody correctly', () => {
    const header = <h1>Home Header</h1>;
    const body = <p>Home Body</p>;

    const { getByText, container } = render(<HomeLayout header={header}>{body}</HomeLayout>);

    expect(getByText('Home Header')).toBeInTheDocument();
    expect(getByText('Home Body')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
