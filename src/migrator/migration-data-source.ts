import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

/**
 * Опции подключения к базе данных для осуществления миграции
 */
export const migrationDataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	entities: ['dist/**/*.entity{.ts,.js}'],
	migrations: ['dist/migrator/migrations/*{.ts,.js}'],
	synchronize: false,
	logging: false,
	cache: false
};

/**
 * Подключение к базе данных для осуществления миграции
 */
const dataSource: DataSource = new DataSource(migrationDataSourceOptions);

export default dataSource;