import axios from 'axios';

// Interfaces
import { Vocabulary, Topic } from '@interfaces';

// Mocks
import { MOCK_VOCABULARIES, MOCK_TOPIC } from '@mocks';

// Services
import { deleteData, getData, postData, putData } from '@services';

jest.mock('axios');

describe('Should test fetch API', () => {
  it('Should return value when call getData success', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: MOCK_VOCABULARIES,
    });
    const response = await getData<Vocabulary[]>('/post', 1);

    expect(response).toEqual(MOCK_VOCABULARIES);
    expect(response.length).toBe(1);
  });

  it('Should return value when call getData failed', async () => {
    const errorMessage = 'Failed to get data';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await getData<Vocabulary[]>('endpoint');
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
    }
  });

  it('should return value when call postData success', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: MOCK_TOPIC,
    });

    const response = await postData<Topic>({ item: MOCK_TOPIC, endpoint: 'endpoint' });

    expect(response).toEqual(MOCK_TOPIC);
  });

  it('should return error message when call postData failed', async () => {
    const errorMessage = 'Failed to post data';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await postData<Topic>({ item: MOCK_TOPIC, endpoint: 'endpoint' });
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
    }
  });

  it('should return value when call putData success', async () => {
    (axios.put as jest.Mock).mockResolvedValue({
      data: MOCK_TOPIC,
    });

    const response = await putData<Topic>({ item: MOCK_TOPIC, endpoint: 'endpoint', id: '1' });

    expect(response).toEqual(MOCK_TOPIC);
  });

  it('should return error message when call putData failed', async () => {
    const errorMessage = 'Failed to put data';
    (axios.put as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await putData<Topic>({ item: MOCK_TOPIC, endpoint: 'endpoint', id: '1' });
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
    }
  });

  it('should return value when call deleteData success', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({
      data: [],
    });

    const response = await deleteData<string>({ endpoint: 'endpoint', id: '1' });

    expect(response).toEqual([]);
  });

  it('should return error message when call deleteData failed', async () => {
    const errorMessage = 'Failed to delete data';
    (axios.delete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await deleteData<string>({ endpoint: 'endpoint', id: '1' });
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
    }
  });
});
