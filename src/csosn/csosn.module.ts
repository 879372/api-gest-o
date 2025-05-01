import { Module } from '@nestjs/common';
import { CsosnService } from './csosn.service';
import { CsosnController } from './csosn.controller';

@Module({
  controllers: [CsosnController],
  providers: [CsosnService],
})
export class CsosnModule {}
