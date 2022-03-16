import axios from 'axios';
import * as supertest from 'supertest';
import { expect, jest } from '@jest/globals';
import app from '../src/app';
import Response from '../src/response';

const request = supertest(app);

jest.mock('axios');
describe('/api endpoint tests', () => {
  let mockedAxios;

  beforeEach(() => {
    mockedAxios = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    mockedAxios.mockRestore();
  });

  it('should fetch the mocked message', async () => {
    const resp: Response = {
      data: { activity: 'Do Something' },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    };
    mockedAxios.mockResolvedValueOnce(resp);
    const actual = await request.get('/api2');
    expect(actual.text).toEqual(resp.data.activity);
    expect(mockedAxios).toHaveBeenCalledWith(
      'https://www.boredapi.com/api/activity'
    );
  });

  it('should not fetch anything', async () => {
    const message = 'Something went wrong';
    mockedAxios.mockRejectedValueOnce(new Error(message));
    const actual = await request.get('/api2');
    expect(actual.text).toEqual(message);
    expect(actual.statusCode).toEqual(500);
    expect(mockedAxios).toHaveBeenCalledWith(
      'https://www.boredapi.com/api/activity'
    );
  });
});
