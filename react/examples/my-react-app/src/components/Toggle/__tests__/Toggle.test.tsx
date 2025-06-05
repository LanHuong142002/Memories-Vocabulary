import { act } from 'react-dom/test-utils';
import Toggle from '../Toggle';
import { RenderResult, render } from '@testing-library/react';

describe('Test Toggle', () => {
  let container: RenderResult;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = render(<></>);
  });

  afterEach(() => {
    // cleanup on exiting
    if (container) {
      container.unmount();
    }
  });

  it('changes value when clicked', () => {
    const onChange = jest.fn();
    act(() => {
      render(<Toggle onChange={onChange} />, container);
    });

    // get a hold of the button element, and trigger some clicks on it
    const button = document.querySelector('[data-testid=toggle]')!;
    expect(button.innerHTML).toBe('Turn on');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe('Turn off');

    act(() => {
      for (let i = 0; i < 5; i++) {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });

    expect(onChange).toHaveBeenCalledTimes(6);
    expect(button.innerHTML).toBe('Turn on');
  });
});
