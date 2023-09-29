import { act, renderHook } from '@testing-library/react';
import { useNotificationStores } from '..';

describe('Test useNotificationStores', () => {
  it('Initial value of useNotificationStores', () => {
    const { result } = renderHook(() => useNotificationStores());

    expect(result.current.notification).toEqual(false);
    expect(result.current.messageError).toEqual('');
  });

  it('Should change value of notification and messageError when set value', () => {
    const { result } = renderHook(() => useNotificationStores());

    expect(result.current.notification).toEqual(false);
    act(() => result.current.setNotification(true));
    expect(result.current.notification).toEqual(true);

    expect(result.current.messageError).toEqual('');
    act(() => result.current.setMessageError('Error'));
    expect(result.current.messageError).toEqual('Error');
  });
});
