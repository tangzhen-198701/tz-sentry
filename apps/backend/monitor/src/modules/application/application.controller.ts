import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApplicationService } from './application.service'
import { AuthGuard } from '@nestjs/passport'

interface CreateApplicationDto {
    name: string
    type: 'vanilla' | 'react' | 'vue'
}

interface RemoveApplicationDto {
    id: string
}


@UseGuards(AuthGuard('jwt'))
@Controller()
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get('application')
    list() {
        return this.applicationService.list()
    }

    @Post('application')
    create(@Body() body: CreateApplicationDto) {
        return this.applicationService.create(body);
    }

    @Delete('application')
    remove(@Body() body: RemoveApplicationDto) {
        return this.applicationService.remove(body.id);
    }
}
