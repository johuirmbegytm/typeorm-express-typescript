import {MigrationInterface, QueryRunner} from "typeorm";

export class Entities1764612303832 implements MigrationInterface {
    name = 'Entities1764612303832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "position" (
                "id_position" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "salary" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_33d6118d15389f7ea7ca12da69d" PRIMARY KEY ("id_position")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "employee" (
                "id_employee" SERIAL NOT NULL,
                "firstname" character varying(50) NOT NULL,
                "lastname" character varying(50) NOT NULL,
                "patronymic" character varying(50) NOT NULL,
                "phone" character varying(20) NOT NULL,
                "hire_date" date NOT NULL,
                "id_position" integer,
                CONSTRAINT "PK_1ff1012cb2d9ef6cc545fb1bb59" PRIMARY KEY ("id_employee")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "FK_412687bfc4ad8d2c653a77edcd4" FOREIGN KEY ("id_position") REFERENCES "position"("id_position") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "employee" DROP CONSTRAINT "FK_412687bfc4ad8d2c653a77edcd4"
        `);
        await queryRunner.query(`
            DROP TABLE "employee"
        `);
        await queryRunner.query(`
            DROP TABLE "position"
        `);
    }

}
