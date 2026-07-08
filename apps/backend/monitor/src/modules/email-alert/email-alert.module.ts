import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import queueConfig from '../../config/queue';
import { EmailModule } from '../email/email.module';
import { EmailAlertsProcessor } from './email-alert.processor';
import { EmailAlertsService } from './email-alert.service';

const config = queueConfig();

@Module({
  imports: [
    EmailModule,
    BullModule.registerQueue({
      name: 'email-alerts',
      redis: config.redis,
      defaultJobOptions: config.queue.emailAlerts.defaultJobOptions,
      limiter: config.queue.emailAlerts.limiter,
    }),
  ],
  providers: [EmailAlertsService, EmailAlertsProcessor],
  exports: [EmailAlertsService],
})
export class EmailAlertModule {}
