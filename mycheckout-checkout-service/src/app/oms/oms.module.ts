import { Module } from '@nestjs/common';
import { VtexModule } from '../vtex/vtex.module';
import { OmsService } from './oms.service';

@Module({
  imports: [VtexModule],
  providers: [OmsService],
  exports: [OmsService],
})
export class OmsModule {}
