import { EmailService } from '../src/modules/email/email.service'
import { EmailAlertsService } from '../src/modules/email-alert/email-alert.service'

describe('email alert pipeline', () => {
    beforeAll(() => {
        process.env.SMTP_FROM = 'sender@example.test'
    })

    it('renders an allow-listed template and calls the SMTP transporter', async () => {
        const sendMail = jest.fn().mockResolvedValue({ messageId: 'message-1' })
        const service = new EmailService({ sendMail } as never)

        await service.alert({
            to: 'recipient@example.test',
            subject: 'Test alert',
            template: 'issues',
            params: { message: '<unsafe>' },
        })

        expect(sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                from: 'sender@example.test',
                to: 'recipient@example.test',
                subject: 'Test alert',
                html: expect.any(String),
            })
        )
    })

    it('enqueues a retryable alert job with metadata', async () => {
        const add = jest.fn().mockResolvedValue({ id: 'job-1' })
        const service = new EmailAlertsService({ add } as never)

        await service.sendErrorAlert({
            to: 'recipient@example.test',
            subject: 'Test alert',
            template: 'issues',
            context: { message: 'boom' },
        })

        expect(add).toHaveBeenCalledWith(
            'send-error-alert',
            expect.objectContaining({
                template: 'issues',
                metadata: expect.objectContaining({ source: 'SpanService' }),
            }),
            undefined
        )
    })
})
