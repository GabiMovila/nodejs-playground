import axios from 'axios';
import * as express from 'express';
import Response from './response';

const app = express();

const getData = async (res) => {
  try {
    const response: Response = await axios.get(
      'https://www.boredapi.com/api/activit'
    );
    res.send(response.data);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

app.get('/hello', (req, res) => {
  res.send('Hello world!');
});

app.get('/api', (req, res) => {
  axios
    .get('https://www.boredapi.com/api/activity')
    .then((response: Response) => {
      res.send(response.data);
    });
});

app.get('/api2', (req, res) => {
  getData(res);
});

export default app;
