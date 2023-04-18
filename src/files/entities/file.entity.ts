
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterRemove,
  } from 'typeorm';
  import { FilesService } from '../files.service';

  
  @Entity()
  export class File {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    entityName: string;
  
    @Column()
    entityID: number;

    @Column()
    savePath: string;

    @Column()
    saveName: string;

    @Column()
    fileType: string;

    @Column()
    fileName: string; 

    @AfterRemove()
    onAfterRemove() {
      const fileService = new FilesService(null);
      const filePath = `./${this.savePath}`;
      fileService.deleteFile(filePath);
      //console.log(this);
      // Do something before the user is deleted  
    }

  }
  


