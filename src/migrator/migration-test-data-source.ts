import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: '.env.test' });

/**
 * Test database connection options for migration
 */
export const migrationTestDataSourceOptions: DataSourceOptions = {
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
 * Connecting to a test database for migration
 */
const testDataSource: DataSource = new DataSource(
	migrationTestDataSourceOptions
);

export default testDataSource;
