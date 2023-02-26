import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

let appPort: number;

const globalPrefix = 'api';
const docsPrefix = `${globalPrefix}/docs`;

/**
 * Swagger docs setter
 * @param app Nest application
 * @param prefix URL prefix for documentation address
 */
const buildSwaggerDocs = (
	app: NestExpressApplication,
	prefix: string
): void => {
	const config = new DocumentBuilder()
		.setTitle('Big Nest.js appication starter')
		.setDescription(
			`
			Nest.js + Postgres + Docker + file uploading + authentifiacation template + 
			class validation + database migrations + e2e testing + Swagger
			`
		)
		.setVersion(process.env.npm_package_version)
		.addBearerAuth({ in: 'header', type: 'http', bearerFormat: 'JWT' })
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(prefix, app, document);
};

/**
 * Creating a directory for uploaded files
 * @param directory Path to file storage directory
 */
const createUploadsDir = (directory: string) => {
	const uploadsDir = path.join(process.cwd(), directory);

	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir);
	}
};

/**
 * Application start point
 */
const boostrap = async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});

	const configService = app.get(ConfigService);

	app.setGlobalPrefix(globalPrefix);

	buildSwaggerDocs(app, docsPrefix);

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Credentials', true);
		next();
	});

	createUploadsDir(configService.get<string>('FILE_STORAGE'));

	appPort = configService.get('PORT');

	await app.listen(appPort);
};

boostrap().then(() => {
	Logger.log(`Application started on port ${appPort}`, 'main');
	Logger.log(
		`API Documentation: http://localhost:${appPort}/${docsPrefix}`,
		'main'
	);
});
