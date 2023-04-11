import { Phone } from '../../persons/entities/phone.entity';
import { ApiModelProperty,ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreatePhonemodelDto {
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  price?: number;
}
