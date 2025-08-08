import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', default: '' })
  first_name: string;

  @Column({ type: 'text', default: '' })
  last_name: string;

  @ManyToOne(() => Profile, profile => profile.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  profile: Profile;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
