import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => User, user => user.profile)
  users: User[];
}
