import { Phone } from '../entities/phone.entity';
import { Phonemodel } from '../../phonemodels/entities/phonemodel.entity';
import { ApiModelProperty, } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty , } from '@nestjs/swagger/dist/decorators/api-property.decorator';



export class CreatePersonDto {
  
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  isActive: boolean;

  @ApiModelProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        kind: { type: 'string' },
        number: { type: 'string' },
        isPrimary: { type: 'boolean' },
        isActive: { type: 'boolean' },
        model: { type: 'object',
          properties: {
            id:{ type: 'number' },
          }
        },
      },
    },
  })
  phones: Phone[];


}
