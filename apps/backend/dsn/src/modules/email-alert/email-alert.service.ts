import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import type { JobOptions, Queue } from 'bull';

export interface EmailAlertJobData {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
  metadata: {
    createdAt: number;
    source: string;
  };
}

@Injectable()
export class EmailAlertsService {
  private readonly logger = new Logger(EmailAlertsService.name);

  constructor(
    @InjectQueue('email-alerts')
    private readonly queue: Queue<EmailAlertJobData>,
  ) {}

  async sendErrorAlert(
    data: Omit<EmailAlertJobData, 'metadata'>,
    options?: JobOptions,
  ): Promise<void> {
    const jobData: EmailAlertJobData = {
      ...data,
      metadata: {
        createdAt: Date.now(),
        source: 'SpanService',
      },
    };

    const job = await this.queue.add('send-error-alert', jobData, options);

    this.logger.debug(`Email alert job enqueued. ID: ${job.id}`);
  }
}
