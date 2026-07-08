import {
  OnQueueActive,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import type { Job } from 'bull';
import queueConfig from '../../config/queue';
import { EmailService } from '../email/email.service';

export interface EmailAlertJobData {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
  metadata?: {
    createdAt: number;
    source: string;
  };
}

export interface EmailAlertJobResult {
  success: boolean;
  completedAt: number;
}

const emailAlertQueueConfig = queueConfig().queue.emailAlerts;

@Injectable()
@Processor('email-alerts')
export class EmailAlertsProcessor {
  private readonly logger = new Logger(EmailAlertsProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process({
    name: 'send-error-alert',
    concurrency: emailAlertQueueConfig.concurrency,
  })
  async handleSendErrorAlert(
    job: Job<EmailAlertJobData>,
  ): Promise<EmailAlertJobResult> {
    try {
      await this.emailService.alert({
        to: job.data.to,
        subject: job.data.subject,
        params: job.data.context ?? {},
      });

      return {
        success: true,
        completedAt: Date.now(),
      };
    } catch (error) {
      const err = error as Error;

      this.logger.error(
        `Job ${job.id} execution failed: ${err.message}`,
        err.stack,
      );

      throw error;
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing email alert job ${job.id}...`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(
      `Job ${job.id} failed attempt ${job.attemptsMade}/${job.opts.attempts}: ${error.message}`,
      error.stack,
    );

    if (job.attemptsMade >= Number(job.opts.attempts ?? 0)) {
      this.logger.error(
        `Job ${job.id} exhausted retries and needs manual intervention.`,
      );
    }
  }
}
