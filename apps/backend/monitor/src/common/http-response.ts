import {
    ArgumentsHost,
    CallHandler,
    Catch,
    ExceptionFilter,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import type { Response } from 'express'
import { map, Observable } from 'rxjs'

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map(data => {
                if (data && typeof data === 'object' && 'success' in data) return data
                return { data: data ?? null, success: true }
            })
        )
    }
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        const status = exception instanceof HttpException ? exception.getStatus() : 500
        const detail = exception instanceof HttpException ? exception.getResponse() : undefined
        const message = typeof detail === 'string' ? detail : this.messageFrom(detail)

        response.status(status).json({
            error: {
                code: status,
                message: status >= 500 ? '服务暂时不可用' : message || '请求失败',
            },
            success: false,
        })
    }

    private messageFrom(detail: object | undefined): string | undefined {
        if (!detail || !('message' in detail)) return undefined
        const message = detail.message
        return Array.isArray(message) ? message.join('; ') : typeof message === 'string' ? message : undefined
    }
}
