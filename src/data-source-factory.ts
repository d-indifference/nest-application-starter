import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

type BuildDataSourceOptions = {
	entities: string[];
	logging: boolean;
};

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
 * Фабрика конфига подключений рабочей версии приложения
 * @param configService Сервис конфигурации
 * @returns Подготовленные настройки конфига подключений
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
 * Фабрика конфига подключений тестовой версии приложения
 * @param configService Сервис конфигурации
 * @returns Подготовленные настройки конфига подключений
 */
export const dataSourceTestFactory = (
	configService: ConfigService
): DataSourceOptions => {
	return buildDataSource(configService, {
		entities: ['src/**/*.entity{.ts,.js}'],
		logging: false
	});
};
