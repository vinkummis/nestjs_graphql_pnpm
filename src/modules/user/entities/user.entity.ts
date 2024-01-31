import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: '50', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: '100', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  password: string;

  fullName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @AfterLoad()
  getFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
