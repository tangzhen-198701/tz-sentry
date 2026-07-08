import { Body, Controller, Param, Post } from '@nestjs/common';
import { SpanService } from './span.service';

@Controller()
export class SpanController {
  constructor(private readonly spanService: SpanService) {}

  @Post('tracking/:app_id')
  async getTracking(@Param() { app_id}: { app_id: string }, @Body() params: { event_type: string, message?: string}[]){
    return this.spanService.tracking(app_id, params);
  }
}
