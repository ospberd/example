import { Phone } from '../../persons/entities/phone.entity';
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreatePhonemodelDto {
  id: string;
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  price?: number;
}
