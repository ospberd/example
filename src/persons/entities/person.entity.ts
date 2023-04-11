import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  OneToMany,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Phonemodel } from '../../phonemodels/entities/phonemodel.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Phone, (phone) => phone.person, {
    cascade: true,
  })
  phones: Phone[];

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
