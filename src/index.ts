import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Data Source has been initialized!');
});
