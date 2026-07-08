import { DynamicModule, Global, Module } from "@nestjs/common";
import { createClient } from "@clickhouse/client";
@Global()
//nestjs 模块
@Module({})
export class ClickHouseModule {
    static forRoot(options: { url: string, username: string, database: string, password: string }): DynamicModule {
        return {
           module: ClickHouseModule,
           providers: [
            {
                provide: 'CLICKHOUSE_CLIENT',
                useFactory(){
                    //单例 返回clickhouse 客户端实例, 用来后续操作clickhouse
                    return createClient(options);
                }
            }
           ],
           exports: [
            'CLICKHOUSE_CLIENT'
           ],
        };
    }
}