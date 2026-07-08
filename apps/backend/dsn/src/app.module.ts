import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClickHouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { SpanModule } from './modules/span/span.module';
import { EmailModule } from './fundamentals/email/email.module';

@Module({
  imports: [
    ClickHouseModule.forRoot({
      url: 'http://192.168.0.102:8123',
      username: 'tangwenlin41',
      database: 'tangwenlin41',
      password: 'tangwenlin41',
    }),
    EmailModule.forRoot({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: 'tang192701434@163.com',
        pass: 'MCsH73Zc6YQ5MXJ9',
      },
    }),
    SpanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
