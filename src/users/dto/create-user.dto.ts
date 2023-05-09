
import { ApiModelProperty, } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty , } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
  
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  confirmpassword: string;

/*  @ApiModelProperty({
    type: 'array',
    items: {type: 'string', },
    })
  roles: Role[];
*/
}
