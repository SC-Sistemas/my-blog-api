import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;

  @OneToOne(() => Profile, { nullable: false, cascade: true }) //Cascade permite de forma anidada, crea el usuario y el perfil al mismo tiempo
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]; //Un usuario no tiene un posts, tiene varios posts
}
