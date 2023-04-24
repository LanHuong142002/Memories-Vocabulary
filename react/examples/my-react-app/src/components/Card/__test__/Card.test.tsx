import { RenderResult, fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Card from '../Card';

describe('Testing Card', () => {
  let container: RenderResult;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = render(<></>);
    jest.useFakeTimers();
  });

  afterEach(() => {
    // cleanup on exiting
    if (container) container.unmount();
    jest.useRealTimers();
  });

  it('should select null after timing out', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });

    // move ahead in time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    // and then move ahead by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('should cleanup on being removed', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onSelect).not.toHaveBeenCalled();

    // unmount the app
    act(() => {
      render(<></>, container);
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should accept selections', () => {
    const onSelect = jest.fn();
    act(() => {
      render(<Card onSelect={onSelect} />, container);
    });

    act(() => {
      const detailsElement = container?.container.querySelector("[data-testid='2']");
      fireEvent.click(detailsElement!);
    });

    expect(onSelect).toBeCalled();
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
