import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

/**
 * Database connection options for migration
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
 * Database connection for migration
 */
const dataSource: DataSource = new DataSource(migrationDataSourceOptions);

export default dataSource;
