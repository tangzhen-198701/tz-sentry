import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import type { Response } from 'express'

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        const status = exception instanceof HttpException ? exception.getStatus() : 500
        const detail = exception instanceof HttpException ? exception.getResponse() : undefined
        const message =
            typeof detail === 'string'
                ? detail
                : detail && 'message' in detail
                  ? Array.isArray(detail.message)
                      ? detail.message.join('; ')
                      : String(detail.message)
                  : undefined

        response.status(status).json({
            error: { code: status, message: status >= 500 ? '服务暂时不可用' : message || '请求失败' },
            success: false,
        })
    }
}
