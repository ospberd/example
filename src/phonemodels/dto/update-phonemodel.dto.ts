import { PartialType } from '@nestjs/swagger';
import { CreatePhonemodelDto } from './create-phonemodel.dto';

export class UpdatePhonemodelDto extends PartialType(CreatePhonemodelDto) {}
