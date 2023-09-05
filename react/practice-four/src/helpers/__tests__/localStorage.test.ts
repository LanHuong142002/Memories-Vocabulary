import { getItems, setItems } from '@helpers';

describe('Test setItems localStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Data should add into local storage', () => {
    const mockId = '111';
    const mockJson = { data: 'json data' };
    setItems(mockId, mockJson);

    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it('Data should be overwritten', () => {
    const mockId = '222';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setItems(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });

  it('Should get data from local storage', () => {
    const mockId = '111';
    const mockJson = { data: 'json data' };
    window.localStorage.setItem(mockId, JSON.stringify(mockJson));

    const retrievedData = getItems(mockId);
    expect(retrievedData).toEqual(mockJson);
  });

  it('Should return null for non-existent data', () => {
    const mockId = '222';

    const retrievedData = getItems(mockId);
    expect(retrievedData).toBeNull();
  });
});

describe('Test getItems localStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Should get data from local storage', () => {
    const mockId = '111';
    const mockJson = { data: 'json data' };
    window.localStorage.setItem(mockId, JSON.stringify(mockJson));

    const retrievedData = getItems(mockId);
    expect(retrievedData).toEqual(mockJson);
  });

  it('Should return null for non-existent data', () => {
    const mockId = '222';

    const retrievedData = getItems(mockId);
    expect(retrievedData).toBeNull();
  });
});
