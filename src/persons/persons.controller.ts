import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@ApiTags('persons')


@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }


 
  @ApiBearerAuth('JWT-auth')
  @Get()  
  @UseGuards(AuthGuard)
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  save(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.save(id, updatePersonDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }
}
