import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhonemodelsService } from './phonemodels.service';
import { CreatePhonemodelDto } from './dto/create-phonemodel.dto';
import { UpdatePhonemodelDto } from './dto/update-phonemodel.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('phonemodels')

@Controller('phonemodels')
export class PhonemodelsController {
  constructor(private readonly phonemodelsService: PhonemodelsService) {}

  @Post()
  create(@Body() createPhonemodelDto: CreatePhonemodelDto) {
    return this.phonemodelsService.create(createPhonemodelDto);
  }

  @Get()
  findAll() {
    return this.phonemodelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phonemodelsService.findOne(id);
  }

  @Patch(':id')
  save(
    @Param('id') id: string,
    @Body() updatePhonemodelDto: UpdatePhonemodelDto,
  ) {
    return this.phonemodelsService.save(id, updatePhonemodelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phonemodelsService.remove(id);
  }
}
