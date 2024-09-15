import { DataSource } from 'typeorm';
import { User } from './entity/User'; // Импортируйте ваши сущности

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'foki',
  password: 'foki',
  database: 'fokidb',
  synchronize: true,
  logging: false,
  entities: [User],
});
