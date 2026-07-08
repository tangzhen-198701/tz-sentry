import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminEntity } from 'src/entities/admin.entity'


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async validateUser(username: string, password: string) {
        const admin = await this.adminRepository.findOne({
            where: {
                username,
                password,
            },
        })

        return admin
    }

    async findByUsername(username: string) {
        return this.adminRepository.findOne({ where: { username } })
    }

    async registerUser(username: string, password: string) {
        const admin = await this.adminRepository.save({
            username,
            password,
        })

        return admin
    }
}
