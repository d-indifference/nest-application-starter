import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testNestApplication } from './test-prepared';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

/**
 * Testing of /api/file endpoints
 */
describe('FileController (e2e)', () => {
	/**
	 * Test version of Nest app
	 */
	let app: INestApplication;

	/**
	 * Credentials for common user
	 */
	const testDataUser = {
		email: 'user1@gmail.com',
		password: 'user1',
		name: 'User1'
	};

	/**
	 * User's bearer token
	 */
	let userToken;

	const sampleFilename = 'sample.png';
	const sampleFileFullPath = path.resolve(
		process.cwd(),
		'test',
		'sample',
		sampleFilename
	);

	beforeEach(async () => {
		app = await testNestApplication();
		await app.init();
	});

	/**
	 * User's signing in test
	 */
	it('/api/user/auth/login (POST) - success', () => {
		console.log(process.cwd());

		return request(app.getHttpServer())
			.post('/user/auth/login')
			.send(testDataUser)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.token).toBeDefined();
				userToken = body.token;
			});
	});

	/**
	 * File uploading test
	 */
	it('/api/file (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/file')
			.set('Authorization', `Bearer ${userToken}`)
			.attach('file', sampleFileFullPath)
			.expect(200)
			.then(() => {
				const configService = app.get(ConfigService);

				const cwd = process.cwd();
				const uploadsDir = path.resolve(
					cwd,
					configService.get<string>('FILE_STORAGE')
				);

				expect(fs.existsSync(uploadsDir)).toBeTruthy();
				expect(fs.readdirSync(uploadsDir).length).toBeGreaterThan(0);
			});
	});
});
