import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User; // Один пользователь имеет одну корзину

  @ManyToMany(() => Product, (product) => product.carts, { eager: true }) // Связь с элементами корзины
  products: Product[];

  // Связь с элементами корзины будет в отдельной сущности CartItem
}
