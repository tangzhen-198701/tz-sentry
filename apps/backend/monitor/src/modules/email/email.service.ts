import { Inject, Injectable } from '@nestjs/common'
import { compile } from 'handlebars'
import fs from 'fs'
import { join } from 'path'
import type { Transporter } from 'nodemailer'

@Injectable()
export class EmailService {
    constructor(@Inject('EMAIL_CLIENT') private readonly emailClient: Transporter) {}

    async alert(params: { to: string; subject: string; params: any }) {
        const { subject, params: message } = params
        const alertTemplate = await fs.promises.readFile(join(__dirname, '../../templates/email/issues.hbs'), 'utf-8')
        const result = await this.emailClient.sendMail({
            from: 'tang192701434@163.com',
            to: params.to,
            subject: subject,
            html: compile(alertTemplate)(message),
        })

        console.log('邮件发送成功', result)
    }
}
