import * as express from 'express';
const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.send(`Something went very wrong: ${err.message}`);
};
export default errorHandler;
