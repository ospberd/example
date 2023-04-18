import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

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
   
    uploadFile.fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')

    return this.filesRepository.save(uploadFile);
  }

  findByEntityID(entityid: number): Promise<File[]> {
    return this.filesRepository.find({
      where: { entityID: entityid },
    });
  }

  findBySavePath(savePath: string): any {
    return this.filesRepository.findOne({
      where: { savePath: savePath },
    });
  }

  async removeAll(entityID: number): Promise<void> {
   const listF = await this.filesRepository.find({
      where: { entityID: entityID },
    })

    await this.filesRepository.remove(listF);
  }

  async removeOne(savePath: string): Promise<void> {
    const theFile = await this.filesRepository.findOne({
      where: { savePath: savePath },
    })
    await this.filesRepository.remove([theFile]);
  }

  deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}


