import { RenderResult, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Counter from '../Counter';

describe('Test Counter', () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(<></>);
  });

  afterEach(() => {
    if (container) container.unmount();
  });

  it('can render and update a counter', () => {
    // Test first render and componentDidMount
    act(() => {
      render(<Counter />, container);
    });

    const button = container?.container.querySelector('button')!;
    const label = container?.container.querySelector('p')!;
    expect(label.textContent).toBe('You clicked 0 times');
    expect(document.title).toBe('You clicked 0 times');

    // Test second render and componentDidUpdate
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(label.textContent).toBe('You clicked 1 times');
    expect(document.title).toBe('You clicked 1 times');
  });
});
