import { act } from 'react-dom/test-utils';
import User from './dataFetching';

import { RenderResult, render } from '@testing-library/react';

describe('Testing User', () => {
  let container: RenderResult;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = render(<User id='1' />);
  });

  afterEach(() => {
    // cleanup on exiting
    if (container) {
      container.unmount();
    }
  });

  it('renders user data', async () => {
    const fakeUser = {
      name: 'Joni Baez',
      age: '32',
      address: '123, Charming Avenue',
    };
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(new Response(JSON.stringify(fakeUser))));

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      container = render(<User id='1' />);
    });

    const detailsElement = container?.container.querySelector('details');
    expect(detailsElement).toBeInTheDocument();

    const summaryElement = container?.container.querySelector('summary');
    expect(summaryElement?.textContent).toBe(fakeUser.name);

    const strongElement = container?.container.querySelector('strong');
    expect(strongElement?.textContent).toBe(fakeUser.age);

    const addressElement = container?.container.querySelector('.address');
    expect(addressElement?.textContent).toBe(fakeUser.address);

    // remove the mock to ensure tests are completely isolated
    (global.fetch as jest.Mock).mockRestore();
  });
});
