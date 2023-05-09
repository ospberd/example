import { ApiModelProperty, } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class NewPassword {
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly confirmpassword : string;
  }
