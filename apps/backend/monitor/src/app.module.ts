import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClickHouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { SpanModule } from './modules/span/span.module';
import { EmailModule } from './fundamentals/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ApplicationModule } from './modules/application/application.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ClickHouseModule.forRoot({
      url: process.env.CLICKHOUSE_URL ?? 'http://192.168.0.102:8123',
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? '192.168.0.102',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    SpanModule,
    ApplicationModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
