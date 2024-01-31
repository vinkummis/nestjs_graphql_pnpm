import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started',
  })
  status: string;

  @ManyToOne(() => User, (user) => user.todos, { eager: true })
  user: User;
}
