import { ClickHouseClient } from '@clickhouse/client'
import { Inject, Injectable } from '@nestjs/common'
import { EmailAlertsService } from '../email-alert/email-alert.service'

@Injectable()
export class SpanService {
    constructor(
        @Inject('CLICKHOUSE_CLIENT') private readonly clickHouseClient: ClickHouseClient,
        private readonly emailAlertsService: EmailAlertsService
    ) {}

    async tracking(app_id: string, params: { event_type: string; message?: string }[]) {
        params.forEach(async item => {
            await this.insertData(app_id, item)
        })
    }

    async insertData(app_id: string, params: { event_type: string; message?: string }) {
        const { event_type, message, ...rest } = params
        const values = {
            app_id,
            event_type,
            message,
            info: rest,
        }

        if (event_type === 'error') {
            this.emailAlertsService
                .sendErrorAlert({
                    to: 'tang192701434@163.com',
                    subject: '错误事件',
                    template: 'issues',
                    context: params,
                })
                .then(res => {
                    console.log('邮件告警任务入队成功', res)
                })
                .catch(err => {
                    console.log('邮件告警任务入队失败', err)
                })
        }

        await this.clickHouseClient.insert({
            table: 'tangwenlin41.base_monitor_storage',
            values,
            columns: ['app_id', 'event_type', 'message', 'info'],
            format: 'JSONEachRow',
        })
    }
}
