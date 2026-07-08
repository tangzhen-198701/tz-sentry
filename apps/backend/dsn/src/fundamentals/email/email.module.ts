import { DynamicModule, Global, Module } from '@nestjs/common'
import { createTransport } from 'nodemailer'

@Global()
//nestjs 模块
@Module({})
export class EmailModule {
    static forRoot(options: { host: string; port: number; secure: boolean; auth: { user: string; pass: string } }): DynamicModule {
        return {
            module: EmailModule,
            providers: [
                {
                    provide: 'EMAIL_CLIENT',
                    useFactory() {
                        //单例 返回clickhouse 客户端实例, 用来后续操作clickhouse
                        return createTransport(options)
                    },
                },
            ],
            exports: ['EMAIL_CLIENT'],
        }
    }
}
