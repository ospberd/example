
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
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


  }
  


