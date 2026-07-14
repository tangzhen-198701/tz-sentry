import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitializeMonitorSchema1752500000000 implements MigrationInterface {
    name = 'InitializeMonitorSchema1752500000000'

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "admin" (
                "id" SERIAL PRIMARY KEY,
                "username" varchar(80) NOT NULL,
                "password" varchar(255) NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true
            )
        `)
        await queryRunner.query('ALTER TABLE "admin" ALTER COLUMN "password" TYPE varchar(255)')
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "application" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar(80) NOT NULL,
                "type" varchar(16) NOT NULL,
                "ownerId" integer,
                "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "isDeleted" boolean NOT NULL DEFAULT false
            )
        `)
        await queryRunner.query('ALTER TABLE "application" ADD COLUMN IF NOT EXISTS "ownerId" integer')
        await queryRunner.query(`
            DO $$
            DECLARE
                admin_count integer;
                only_admin_id integer;
                orphan_count integer;
            BEGIN
                SELECT count(*), min("id") INTO admin_count, only_admin_id FROM "admin";
                SELECT count(*) INTO orphan_count FROM "application" WHERE "ownerId" IS NULL;
                IF orphan_count > 0 AND admin_count <> 1 THEN
                    RAISE EXCEPTION
                        'Cannot assign % existing applications to an owner: expected exactly one admin, found %',
                        orphan_count,
                        admin_count;
                END IF;
                IF orphan_count > 0 THEN
                    UPDATE "application" SET "ownerId" = only_admin_id WHERE "ownerId" IS NULL;
                END IF;
            END $$
        `)
        await queryRunner.query('ALTER TABLE "application" ALTER COLUMN "ownerId" SET NOT NULL')
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_application_owner') THEN
                    ALTER TABLE "application"
                        ADD CONSTRAINT "FK_application_owner"
                        FOREIGN KEY ("ownerId") REFERENCES "admin"("id") ON DELETE RESTRICT;
                END IF;
            END $$
        `)
        await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_application_ownerId" ON "application" ("ownerId")')
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX IF EXISTS "IDX_application_ownerId"')
        await queryRunner.query('ALTER TABLE "application" DROP CONSTRAINT IF EXISTS "FK_application_owner"')
        await queryRunner.query('ALTER TABLE "application" DROP COLUMN IF EXISTS "ownerId"')
    }
}
