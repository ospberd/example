import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './person.entity';
import { Phonemodel } from '../../phonemodels/entities/phonemodel.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kind: string;

  @Column()
  number: string;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Person, (person) => person.phones, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  person: Person;

  @ManyToOne(() => Phonemodel, (model) => model.id, {
    eager: true,
  })
  @JoinColumn({ name: 'phonemodelID' })
  model: Phonemodel;

  /* 
  toJSON() {
    return {
      id: this.id,
      kind: this.kind,
      number: this.number,
      number2: "+51515151515151",//this.number,
      isPrimary: this.isPrimary,
      isActive: this.isActive,
      model: this.model ? this.model : null, // Get the ID of the related Phonemodel entity

     /// phonemodelID2: this.model, // Include the model field in the serialized result
    };
  }
*/
}
