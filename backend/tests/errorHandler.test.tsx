import { expect } from '@jest/globals';
import errorHandler from '../src/middleware/errorHandler';

describe('unit test', () => {
  let sentMessage: string = '';
  const err = new Error('Test error');
  const req: any = {};
  const res: any = {
    statusCode: null,
    send: jest.fn((msg) => {
      sentMessage = msg;
    }),
    status: jest.fn((nr) => {
      res.statusCode = nr;
    }),
  };
  const next = jest.fn();

  it('should pass with status 500', async () => {
    res.statusCode = null;
    errorHandler(err, req, res, next);
    expect(sentMessage).toEqual(`Something went very wrong: ${err.message}`);
    expect(res.statusCode).toEqual(500);
  });

  it('should pass with custom status -> 404', async () => {
    res.statusCode = 404;
    errorHandler(err, req, res, next);
    expect(sentMessage).toEqual(`Something went very wrong: ${err.message}`);
    expect(res.statusCode).toEqual(404);
  });
});
