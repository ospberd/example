
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterRemove,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Role } from './role.entity';
  
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  

    @Column()
    username: string;
  
    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => Role, (role) => role.user, {
      cascade: true,
    })
    roles: Role[];
  

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


  }
  


