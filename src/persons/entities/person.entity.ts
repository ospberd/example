import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Phonemodel } from '../../phonemodels/entities/phonemodel.entity';
import { TotalCost } from './totalcost.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

//  @OneToOne(() => TotalCost, { eager: true })
 // @JoinColumn()
 // totalCost: TotalCost;
 
 @OneToOne(() => TotalCost, (profile) => profile.persona , { eager: true } ) // , { eager: true }
 @JoinColumn()
   total: TotalCost; //['totalsum'];


  @OneToMany(() => Phone, (phone) => phone.person, {
    cascade: true,
  })
  phones: Phone[];



  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @AfterLoad()
  updateCounters() {
    console.log('---->  Record Readed !!!!!', this.phones.length);
  }

  addPhone(phone: Phone) {
    if (this.phones == null) {
      this.phones = new Array<Phone>();
    }
    this.phones.push(phone);
  }
}
