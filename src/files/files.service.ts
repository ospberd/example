import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async uploadFile(file: Express.Multer.File, entityName:string, entityID: number) {
    
    const uploadFile: File = new File();

    uploadFile.entityName = entityName ;
    uploadFile.entityID = entityID;
    uploadFile.saveName = file.filename;
    uploadFile.fileType = file.mimetype;
    uploadFile.savePath = file.path;
   // uploadFile.fileName = file.originalname;
    uploadFile.fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
   /* uploadFile.lastName = createPersonDto.lastName;
    uploadFile.isActive = createPersonDto.isActive;
    uploadFile.phones = createPersonDto.phones;*/

    return this.filesRepository.save(uploadFile);

    console.log(file.originalname);
    console.log(file.size);
    console.log(file.path);
    // TODO: Implement file upload logic
  }
}