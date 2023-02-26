import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

type BuildDataSourceOptions = {
	entities: string[];
	logging: boolean;
};

/**
 * Data source config builder
 * @param configService Nest config service
 * @param options Data source options
 * @returns Data source config
 */
const buildDataSource = (
	configService: ConfigService,
	options: BuildDataSourceOptions
): DataSourceOptions => {
	const { entities, logging } = options;

	return {
		type: 'postgres',
		host: configService.get<string>('POSTGRES_HOST'),
		port: Number(configService.get<number>('POSTGRES_PORT')),
		username: configService.get<string>('POSTGRES_USER'),
		password: configService.get<string>('POSTGRES_PASSWORD'),
		database: configService.get<string>('POSTGRES_DB'),
		entities,
		migrations: ['dist/migrator/migrations/*{.ts,.js}'],
		synchronize: false,
		logging,
		cache: false
	};
};

/**
 * Data source factory for production database version
 * @param configService Config service
 * @returns Prepared settings for production database
 */
export const dataSourceFactory = (
	configService: ConfigService
): DataSourceOptions => {
	return buildDataSource(configService, {
		entities: ['dist/**/*.entity{.ts,.js}'],
		logging: true
	});
};

/**
 * Data source factory for test database version
 * @param configService Config service
 * @returns Prepared settings for test database
 */
export const dataSourceTestFactory = (
	configService: ConfigService
): DataSourceOptions => {
	return buildDataSource(configService, {
		entities: ['src/**/*.entity{.ts,.js}'],
		logging: false
	});
};
