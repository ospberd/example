import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonemodelsService } from './phonemodels.service';
import { PhonemodelsController } from './phonemodels.controller';
import { Phonemodel } from './entities/phonemodel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phonemodel])],
  controllers: [PhonemodelsController],
  providers: [PhonemodelsService],
})
export class PhonemodelsModule {}
