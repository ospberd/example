
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterRemove,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { FilesService } from '../files.service';

  
  @Entity()
  export class File {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    entityName: string;
  
    @Column()
    entityID: string;

    @Column()
    savePath: string;

    @Column()
    saveName: string;

    @Column()
    fileType: string;

    @Column()
    fileName: string; 

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @AfterRemove()
    onAfterRemove() {
      const fileService = new FilesService(null);
      const filePath = `./${this.savePath}`;
      fileService.deleteFile(filePath);
      //console.log(this);
      // Do something before the user is deleted  
    }

  }
  


