import { Module } from '@nestjs/common';
import { CstService } from './cst.service';
import { CstController } from './cst.controller';

@Module({
  controllers: [CstController],
  providers: [CstService],
})
export class CstModule {}
