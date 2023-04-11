import { Injectable } from '@nestjs/common';
import { CreatePhonemodelDto } from './dto/create-phonemodel.dto';
import { UpdatePhonemodelDto } from './dto/update-phonemodel.dto';
import { Phonemodel } from './entities/phonemodel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhonemodelsService {
  constructor(
    @InjectRepository(Phonemodel)
    private phonemodelRepository: Repository<Phonemodel>,
  ) {}


   create(createPhonemodelDto: CreatePhonemodelDto): Promise<Phonemodel> {
    const model: Phonemodel = new Phonemodel();

    model.id = createPhonemodelDto.id;
    model.name = createPhonemodelDto.name;
    model.price = createPhonemodelDto.price;
    

    return this.phonemodelRepository.save(model);
  }


  findAll(): Promise<Phonemodel[]> {
    return this.phonemodelRepository.find({
    }); //`This action returns all persons`;
  }

  findOne(id: number): Promise<Phonemodel> {
    return this.phonemodelRepository.findOne({
      where: { id: id },
    });
  }

  update(id: number, updatePhonemodelDto: UpdatePhonemodelDto) {
    return `This action updates a #${id} phonemodel`;
  }

  async save(id: number, updatePhonemodelDto: UpdatePhonemodelDto): Promise<Phonemodel> {
    // Update

    await this.phonemodelRepository.save({
      id: id,
      name: updatePhonemodelDto.name,
      price: updatePhonemodelDto.price,

    });
        // Return
        return this.phonemodelRepository.findOne({
          where: { id: id },

        });
      }


  async remove(id: number): Promise<void> {
    await this.phonemodelRepository.delete(id);
  }

}
