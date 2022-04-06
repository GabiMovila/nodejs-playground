import axios, { AxiosResponse } from 'axios';
import * as express from 'express';
import CustomResponse from './response';
import * as cors from 'cors';
import { MongoClient } from 'mongodb';
import * as mongoose from 'mongoose';
import Cat from './cat';
import 'dotenv/config';

const app = express();
const allowedOrigins = ['http://localhost:3000'];
const dbConnectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

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

app.get('/mongodb', (req, res: express.Response) => {
  inputData();
  res.send('1 kitty inserted');
});

app.get('/mongodb2', (req, res: express.Response) => {
  inputDataWithMongoose();
  res.send('1 kitty inserted');
});

const inputData = () => {
  MongoClient.connect(dbConnectionString, (err, db) => {
    var dbo = db.db('node-app-db');
    var catoToBeInserted: Cat = { name: 'Jessie', color: 'orange' };
    dbo.collection('Cats').insertOne(catoToBeInserted, (err, res) => {
      if (err) throw err;
      console.log('1 kitty inserted');
      db.close();
    });
  });
};

const kittySchema = new mongoose.Schema({
  name: String,
});

const inputDataWithMongoose = () => {
  mongoose.connect(dbConnectionString);
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);
  const kitty = new Kitten({ name: 'Tessie' });
  kitty.speak();
  kitty.save();
};

export default app;
