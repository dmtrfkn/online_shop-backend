import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
