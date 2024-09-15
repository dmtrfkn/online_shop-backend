import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use('/api', routes);
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => console.log('Error during Data Source initialization', error));
