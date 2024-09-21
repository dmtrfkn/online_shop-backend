import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cart } from './Cart';
import { Comment } from './Comment';
import { WishList } from './WishList';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  ageInDogYears: number;

  @OneToOne(() => Cart, (cart) => cart.user, { eager: true }) // Один пользователь имеет одну корзину
  cart: Cart; // Изменено на одну корзину

  @OneToMany(() => Comment, (comment) => comment.user, { eager: true }) // Загружаем комментарии
  comments: Comment[];

  @OneToOne(() => WishList, (wishList) => wishList.user)
  wishList: WishList;
}
