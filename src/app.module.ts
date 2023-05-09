import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PersonsModule } from './persons/persons.module';
import { PhonemodelsModule } from './phonemodels/phonemodels.module';
import { FilesModule } from './files/files.module';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ospberd',
      password: '1',
      database: 'myfirm',
      entities: ['dist/**/*.entity{.ts,.js}'],
      dropSchema: false,
      synchronize: true,
      migrationsRun: false,
      logging: true,
      migrations: ['dist/modules/**/db/migrations/*{.ts,.js}'],
    }),
    PersonsModule,
    PhonemodelsModule,
    UsersModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController, AlertController],
  providers: [AppService, ChatGateway, AlertGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
