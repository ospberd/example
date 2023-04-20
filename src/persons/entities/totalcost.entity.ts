import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    RelationId,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ViewEntity,
    ViewColumn,
    OneToOne,
    Index,
    PrimaryColumn,
  } from 'typeorm';
  import { Person } from './person.entity';
  import { Phonemodel } from '../../phonemodels/entities/phonemodel.entity';
  


  @ViewEntity({
    expression: `
    SELECT person.id personaID, SUM(phonemodel.price) cost FROM person 
    LEFT JOIN phone ON person.id = phone.personId
    LEFT JOIN phonemodel ON phone.phonemodelID = phonemodel.id
    GROUP BY person.id
    ORDER BY personaID;
    `,
})

export class TotalCost {
    @ViewColumn()
    personaID: string

    @ViewColumn()
    cost: number

    @OneToOne(type => Person, b => b.id)
@JoinColumn({ name: 'personaID' })
public persona: Person;

 //   @OneToOne(() => Person, (profile) => profile.id) // specify inverse side as a second parameter
 ///@JoinColumn()
 // person: Person["id"];
  
}

  