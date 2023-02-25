import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testNestApplication } from './test-prepared';

/**
 * Testing of /api/user endpoints with root user
 */
describe('UserController & AuthController (root-user) (e2e)', () => {
	/**
	 * Test version of Nest app
	 */
	let app: INestApplication;

	/**
	 * "Old" credentials for root user
	 */
	const oldRoot = {
		email: 'root@gmail.com',
		password: 'root1'
	};

	/**
	 * Credentials for common user
	 */
	const testDataUser = {
		email: 'user1@gmail.com',
		password: 'user1',
		name: 'User1'
	};

	/**
	 * Updated credentials for common user
	 */
	const testDataUserUpdated = {
		email: 'user@yandex.ru',
		password: 'new-test',
		name: 'Mike Doe'
	};

	/**
	 * Root user's bearer token
	 */
	let rootToken;

	/**
	 * Created user's ID
	 */
	let newUserId;

	/**
	 * Created user's bearer token
	 */
	let newUserToken;

	beforeEach(async () => {
		app = await testNestApplication();
		await app.init();
	});

	/**
	 * User's signing in test
	 */
	it('/api/user/auth/login (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/user/auth/login')
			.send(oldRoot)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.token).toBeDefined();
				rootToken = body.token;
			});
	});

	/**
	 * User's signing up test
	 */
	it('/api/user/auth/registration (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/user/auth/registration')
			.send(testDataUser)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.token).toBeDefined();
				newUserToken = body.token;
			});
	});

	/**
	 * Getting user's data by its bearer token test
	 */
	it('/api/user/auth/whois (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/user/auth/whois')
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.id).toBeDefined();
				newUserId = body.id;
			});
	});

	/**
	 * User's getting by its ID for update test
	 */
	it('/api/user/{id}/edit (GET) - success', () => {
		return request(app.getHttpServer())
			.get(`/user/${newUserId}/edit`)
			.set('Authorization', `Bearer ${rootToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.email).toBe(testDataUser.email);
			});
	});

	/**
	 * User's update test
	 */
	it('/api/user/{id} (PUT) - success', () => {
		return request(app.getHttpServer())
			.put(`/user/${newUserId}`)
			.set('Authorization', `Bearer ${rootToken}`)
			.send(testDataUserUpdated)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.email).toBe(testDataUserUpdated.email);
			});
	});

	/**
	 * User's delete test
	 */
	it('/api/user (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/user')
			.set('Authorization', `Bearer ${rootToken}`)
			.send({ ids: [newUserId] })
			.expect(204);
	});
});
