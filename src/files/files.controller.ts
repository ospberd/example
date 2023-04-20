import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Response } from 'express';
import { log } from 'console';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @ApiOperation({summary: 'Managed attachment files'})
  
 
  @Get(':entityid')
  findByEntity(@Param('entityid') entityid: string) {
    return this.filesService.findByEntityID(entityid);
  }

  @Get('download/:savepath')
    async downloadFile(@Param('savepath') savePath: string, @Res() res: Response) {  
    const {  fileType, fileName }  = await this.filesService.findBySavePath(savePath);
    const fileLocation = `./${savePath}`;
    res.setHeader('Content-type', fileType);
    res.download(fileLocation, fileName);
  }

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
                   @Body('entityID') entityID: string) {
    await this.filesService.uploadFile(file,entityName,entityID );
  }

  @Delete('all/:entityid')
  removeAll(@Param('entityid') entityID: string) {
    
    return this.filesService.removeAll(entityID);
  }

  @Delete('one/:savepath')
  removeOne(@Param('savepath') savePath: string) {
    return this.filesService.removeOne(savePath);
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