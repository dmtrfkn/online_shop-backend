import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Comment } from './Comment';
import { Cart } from './Cart';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  image: string;

  @OneToMany(() => Comment, (comment) => comment.product, { eager: true }) // Загружаем комментарии
  comments: Comment[];

  @ManyToMany(() => Cart, (cart) => cart.products) // Связь с элементами корзины
  carts: Cart[];
}
