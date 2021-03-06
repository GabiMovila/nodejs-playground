import * as express from 'express';
import * as cors from 'cors';
import 'dotenv/config';
import * as bodyParser from 'body-parser';
import connectToDB from './config/db';
import router from './routes/factRoutes';
import errorHandler from './middleware/errorHandler';

connectToDB();

const app = express();
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/facts', router);
app.use(errorHandler);

export default app;
