import { Module } from '@nestjs/common';
import { SpanController } from './span.controller';
import { SpanService } from './span.service';
import { EmailAlertModule } from '../email-alert/email-alert.module';


@Module({
  imports: [EmailAlertModule],
  controllers: [SpanController],
  providers: [SpanService],
  exports: [SpanService],
})
export class SpanModule {}
