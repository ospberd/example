import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,} from 'typeorm';
import { User } from './user.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CUSTOMER = 'customer',
  GUEST = 'guest',
  USER = 'user',
  CHANGEHIMSELF = 'changehimself'
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.id, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at?: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at?: Date;

}
