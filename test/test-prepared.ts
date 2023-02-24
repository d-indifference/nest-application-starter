import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../src/user/user.module';
import { dataSourceTestFactory } from '../src/data-source-factory';

/**
 * Сборка тестового экземпляра приложения
 * @returns Тестовый экземпляр приложения
 */
export const testNestApplication = async (): Promise<INestApplication> => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [
			ConfigModule.forRoot({
				envFilePath: '.env.test'
			}),
			TypeOrmModule.forRootAsync({
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: dataSourceTestFactory
			}),
			UserModule
		]
	}).compile();

	return moduleFixture.createNestApplication();
};
