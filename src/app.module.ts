import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PersonsModule } from './persons/persons.module';
import { PhonemodelsModule } from './phonemodels/phonemodels.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ChatGateway } from './chat/chat/chat.gateway';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'osp',
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
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
