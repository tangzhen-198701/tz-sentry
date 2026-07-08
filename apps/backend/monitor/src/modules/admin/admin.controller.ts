import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('admin/validate')
    validateUser(@Query('username') username: string, @Query('password') password: string) {
        return this.adminService.validateUser(username, password)
    }

    @Post('admin/register')
    registerUser(@Body() body: { username: string; password: string }) {
        const { username, password } = body
        return this.adminService.registerUser(username, password)
    }
}
