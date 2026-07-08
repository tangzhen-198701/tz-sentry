import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('application')
export class Application {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'varchar', length: 80 })
    name: string
    @Column({ type: 'enum', enum: ['vanilla', 'react', 'vue'] })
    type: string

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ default: false })
    isDeleted: boolean
}
