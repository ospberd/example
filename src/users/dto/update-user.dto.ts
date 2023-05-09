import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

//export class UpdateUserDto extends PartialType(CreateUserDto) {
  export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'confirmpassword'])) {

  }