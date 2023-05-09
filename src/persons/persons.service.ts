import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';


@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personsRepository: Repository<Person>,
  ) {}

  public create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person: Person = new Person();

    person.firstName = createPersonDto.firstName;
    person.lastName = createPersonDto.lastName;
    person.isActive = createPersonDto.isActive;
    person.phones = createPersonDto.phones;

    return this.personsRepository.save(person);
  }

  findAll(): Promise<Person[]> {
    return this.personsRepository.find({
      relations: {
        phones: true, 
   
      },
    }); //`This action returns all persons`;
  }

  findOne(id: string): Promise<Person> {
    return this.personsRepository.findOne({
      where: { id: id },
      relations: {
        phones: true, 
 
      },
    });
  }

  /*
async findOne(id: number): Promise<Person> {
  const query = this.personsRepository.createQueryBuilder('person')
    .leftJoinAndSelect('person.phones', 'phone')
    .where('person.id = :id', { id })
    .getOne();

  return query;
}

*/

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    // Update
    console.log('----- update');
    console.log(updatePersonDto.phones);
    await this.personsRepository.update(id, {
      firstName: updatePersonDto.firstName,
      lastName: updatePersonDto.lastName,
      isActive: updatePersonDto.isActive,
      ///// !!!!!!!!!!!      phones : updatePersonDto.phones,
    });

    // Return
    return this.personsRepository.findOneBy({ id });
  }

  async save(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    // Update
    console.log('--------save');
    console.log(updatePersonDto.phones);
    await this.personsRepository.save({
      id: id,
      firstName: updatePersonDto.firstName,
      lastName: updatePersonDto.lastName,
      isActive: updatePersonDto.isActive,
      phones: updatePersonDto.phones,
    });

    // Return
    return this.personsRepository.findOne({
      where: { id: id },
      relations: {
        phones: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.personsRepository.delete(id);
  }
}
