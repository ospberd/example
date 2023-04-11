import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @ApiOperation({summary: 'Upload file and save on server'})
 

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest:  'uploads/'+Today().year+'/'+Today().month
  })) // 👈 field name must match// ! @ApiResponse({status:200, type:File})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        entityID: { type: 'number' },
        entityName: { type: 'string' },
        file: { // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, 
                   @Body('entityName') entityName: string, 
                   @Body('entityID') entityID: number) {
    await this.filesService.uploadFile(file,entityName,entityID );
  }
}

function Today(): {day: number, month: number, year: number} {
  const currentDate = new Date();
  return {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  };
}