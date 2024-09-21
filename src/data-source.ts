import { DataSource } from 'typeorm';
import { User } from './entity/User'; // Импортируйте ваши сущности
import { Cart } from './entity/Cart';
import { Product } from './entity/Product';
import { WishList } from './entity/WishList';
import { Comment } from './entity/Comment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'foki',
  password: 'foki',
  database: 'mydb',
  synchronize: true,
  logging: false,
  entities: [User, Cart, Product, WishList, Comment],
});
