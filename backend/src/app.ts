import axios, { AxiosResponse } from 'axios';
import * as express from 'express';
import CustomResponse from './response';
//import cors from 'cors';

const app = express();
//app.use(cors);

async function getData(res: express.Response) {
  try {
    const response: AxiosResponse = await axios.get(
      'https://www.boredapi.com/api/activity'
    );
    const typedResponse: CustomResponse = response.data;
    res.send(typedResponse);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

app.get('/hello', (req, res: express.Response, next) => {
  res.send('Hello world!');
});

app.get('/api', (req, res: express.Response) => {
  axios
    .get('https://www.boredapi.com/api/activity')
    .then((response: AxiosResponse) => {
      const typedResponse: CustomResponse = response.data;
      res.send(typedResponse);
    })
    .catch(function (error) {
      res.status(500);
      res.send(error.message);
    });
});

app.get('/api2', (req, res: express.Response) => {
  getData(res);
});

export default app;
