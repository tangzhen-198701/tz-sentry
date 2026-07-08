import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Application } from 'src/entities/application.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>
    ) {}

    async list() {
        const [data, count] = await this.applicationRepository.findAndCount({
            where: { isDeleted: false },
        })
        console.log('data', data)
        return {
            data,
            count,
        }
    }

    async create(params: { name: string; type: 'vanilla' | 'react' | 'vue' }) {
        const application = await this.applicationRepository.save(params)
        console.log('application', application)
        return application
    }

    async getOne(id: string) {
        const application = await this.applicationRepository.findOne({ where: { id } })
        return application
    }

    async remove(id: string) {
        const data = await this.getOne(id)
        if (!data) {
            throw new Error('应用不存在')
        }
        await this.applicationRepository.update(id, { isDeleted: true })
    }
}
