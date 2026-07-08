import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'varchar', length: 80 })
    username: string

    @Column({ type: 'varchar', length: 16 })
    password: string

    @Column({ default: true })
    isActive: boolean
}
