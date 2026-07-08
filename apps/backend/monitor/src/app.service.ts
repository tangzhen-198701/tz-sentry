import { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('CLICKHOUSE_CLIENT') private readonly clickHouseClient: ClickHouseClient){

  }
  getHello(): string {
    return 'Hello World!';
  }

  async getClickHouseInfo(){
     const res = await this.clickHouseClient.query({
       query: 'SELECT * FROM base_monitor_view',
     });
     return res.json()
  }
}
