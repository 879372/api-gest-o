import { Module } from '@nestjs/common';
import { NcmService } from './ncm.service';
import { NcmController } from './ncm.controller';

@Module({
  controllers: [NcmController],
  providers: [NcmService],
})
export class NcmModule {}
