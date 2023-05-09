import { ApiModelProperty, } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';


export class  LoginDto {
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
  }
