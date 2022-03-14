import axios from 'axios';
import app from './app';
import * as supertest from 'supertest';
import { expect, jest } from '@jest/globals';
const request = supertest(app);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
//ts-jest

describe('/api endpoint tests', () => {
  it('should fetch the mocked message', async () => {
    const resp = { data: { activity: 'Do Something' } };
    mockedAxios.get.mockResolvedValueOnce(resp);
    const actual = await request.get('/api2');
    expect(actual.text).toEqual(resp.data.activity);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.boredapi.com/api/activity'
    );
  });

  it('should not fetch anything', async () => {
    const message = 'Something went wrong';
    mockedAxios.get.mockRejectedValueOnce(new Error(message));
    const actual = await request.get('/api2');
    expect(actual.text).toEqual(message);
    expect(actual.statusCode).toEqual(500);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.boredapi.com/api/activity'
    );
  });
});
