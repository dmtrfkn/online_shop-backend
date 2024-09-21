import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
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

  @OneToOne(() => Cart, (cart) => cart.id)
  cart: Cart;

  @OneToOne(() => WishList, (wishList) => wishList.id)
  wishList: WishList;

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[];
}
