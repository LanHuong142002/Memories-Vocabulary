import { Vocabulary, Topic } from '@interfaces';
import { MOCK_VOCABULARIES, MOCK_TOPIC } from '@mocks';
import { getData, postData, putData } from '@services';
import axios from 'axios';

jest.mock('axios');

describe('Should test fetch API', () => {
  it('Should return value when call getData success', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: MOCK_VOCABULARIES,
    });

    const response = await getData<Vocabulary[]>('endpoint');

    expect(response).toEqual(MOCK_VOCABULARIES);
    expect(response.length).toBe(1);
  });

  it('Should return value when call getData failed', async () => {
    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await getData<Vocabulary[]>('endpoint');
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
      return error;
    }
  });

  it('should return value when call postData success', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: MOCK_TOPIC,
    });

    const response = await postData<Topic>(MOCK_TOPIC, 'endpoint');

    expect(response).toEqual(MOCK_TOPIC);
  });

  it('should return error message when call postData failed', async () => {
    const errorMessage = 'Failed to post data';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await postData<Topic>(MOCK_TOPIC, 'endpoint');
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
      return error;
    }
  });

  it('should return value when call putData success', async () => {
    (axios.put as jest.Mock).mockResolvedValue({
      data: MOCK_TOPIC,
    });

    const response = await putData<Topic>(MOCK_TOPIC, 'endpoint');

    expect(response).toEqual(MOCK_TOPIC);
  });

  it('should return error message when call putData failed', async () => {
    const errorMessage = 'Failed to post data';
    (axios.put as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await putData<Topic>(MOCK_TOPIC, 'endpoint');
    } catch (error) {
      expect((error as { message: string }).message).toBe(errorMessage);
      return error;
    }
  });
});
