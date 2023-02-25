import { MigrationInterface, QueryRunner } from 'typeorm';
import { config } from 'dotenv';
import * as CryptoJS from 'crypto-js';

config();

/**
 * Init database migration
 */
export class Init1677233529112 implements MigrationInterface {
	name = 'Init1677233529112';

	/**
	 * Encrypt a password
	 * @param password Password without encryption
	 * @returns Encrypted password
	 */
	private encryptPassword(password: string): string {
		return CryptoJS.AES.encrypt(
			password,
			process.env.PRIVATE_KEY
		).toString();
	}

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "usr"');

		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "usr"."user" (
				"id" SERIAL NOT NULL, 
				"email" character varying(200) NOT NULL, 
				"password" character varying(200) NOT NULL, 
				"role" character varying(32) NOT NULL, 
				"name" character varying(300) NOT NULL, 
				CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
			)`
		);

		await queryRunner.query(
			`INSERT INTO usr."user" (email, "password", "role", "name")
			VALUES 
			('root@gmail.com', '${this.encryptPassword('root1')}', 'ROOT', 'Root1');`
		);

		await queryRunner.query(
			`INSERT INTO usr."user" (email, "password", "role", "name")
			VALUES 
			('user1@gmail.com', '${this.encryptPassword('user1')}', 'USER', 'User1');`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "usr"."user"');
		await queryRunner.query('DROP SCHEMA "usr"');
	}
}
