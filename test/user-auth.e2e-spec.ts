import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testNestApplication } from './test-prepared';

/**
 * Testing of /api/user endpoints with common user
 */
describe('UserController & AuthController (e2e)', () => {
	/**
	 * Test version of Nest app
	 */
	let app: INestApplication;

	/**
	 * Correct credentials for root user
	 */
	const testDataRight = {
		email: 'root@gmail.com',
		password: 'root1'
	};

	/**
	 * Incorrect credentials for root user
	 */
	const testDataBadPassword = { email: 'root@gmail.com', password: 'tor' };

	/**
	 * Data for new root user creating
	 */
	const testDataRoot = {
		email: 'root2@gmail.com',
		password: 'testRoot',
		name: 'Root Root'
	};

	/**
	 * Data for new common user creating
	 */
	const testDataUser = {
		email: 'user2@gmail.com',
		password: 'test',
		name: 'Jill Doe'
	};

	/**
	 * Data for new common user updating
	 */
	const testDataUserUpdated = {
		email: 'user@yandex.ru',
		password: 'new-test',
		name: 'Peter Doe'
	};

	/**
	 * Deletition DTO for existing users
	 */
	const deleteDataRight = { ids: [] };

	/**
	 * Incorrect deletition DTO
	 */
	const deleteDataFailed = { ids: [1, 2] };

	/**
	 * Root user's bearer token
	 */
	let token;

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
	 * Root user's sign in test
	 */
	it('/api/user/auth/login (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/user/auth/login')
			.send(testDataRight)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.token).toBeDefined();
				token = body.token;
			});
	});

	/**
	 * Root user's sign in with test with incorrect data
	 */
	it('/api/user/auth/login (POST) - failed', () => {
		return request(app.getHttpServer())
			.post('/user/auth/login')
			.send(testDataBadPassword)
			.expect(401);
	});

	/**
	 * Getting user's data by its bearer token test
	 */
	it('/api/user/auth/whois (POST)', () => {
		return request(app.getHttpServer())
			.post('/user/auth/whois')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.id).toBe(1);
			});
	});

	/**
	 * Creating new user test
	 */
	it('/api/user (POST)', () => {
		return request(app.getHttpServer())
			.post('/user')
			.set('Authorization', `Bearer ${token}`)
			.send(testDataRoot)
			.expect(201)
			.then(({ body }: request.Response) => {
				expect(body.id).toBeDefined();
			});
	});

	/**
	 * New user's sign up test
	 */
	it('/api/user/auth/registration (POST)', () => {
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
	it('/api/user/auth/whois (POST) - for user', () => {
		return request(app.getHttpServer())
			.post('/user/auth/whois')
			.set('Authorization', `Bearer ${newUserToken}`)
			.send({ token: newUserToken })
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.id).toBeDefined();
				newUserId = body.id;
			});
	});

	/**
	 * Getting users list test
	 */
	it('/api/user (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/user')
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.length).toBeGreaterThan(0);
				expect(body[0].id).toBe(1);
			});
	});

	/**
	 * Getting all roles in system test
	 */
	it('/api/user/roles (GET)', () => {
		return request(app.getHttpServer())
			.get('/user/roles')
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.roles.length).toBeGreaterThan(0);
			});
	});

	/**
	 * User's getting by its ID test
	 */
	it('/api/user/{id} (GET) - success', () => {
		return request(app.getHttpServer())
			.get(`/user/${newUserId}`)
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.id).toBe(newUserId);
			});
	});

	/**
	 * Checking for getting non-existent user test
	 */
	it('/api/user/{id} (GET) - failed', () => {
		return request(app.getHttpServer())
			.get('/user/100')
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(404);
	});

	/**
	 * User's getting by its ID for update test
	 */
	it('/api/user/{id}/edit (GET) - success', () => {
		return request(app.getHttpServer())
			.get(`/user/${newUserId}/edit`)
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.email).toBe(testDataUser.email);
			});
	});

	/**
	 * Test to check if a non-root user can get data about another user
	 */
	it('/api/user/{id}/edit (GET) - failed', () => {
		return request(app.getHttpServer())
			.get('/user/1/edit')
			.set('Authorization', `Bearer ${newUserToken}`)
			.expect(403);
	});

	/**
	 * User updating test
	 */
	it('/api/user/{id} (PUT) - success', () => {
		return request(app.getHttpServer())
			.put(`/user/${newUserId}`)
			.set('Authorization', `Bearer ${newUserToken}`)
			.send(testDataUserUpdated)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
				expect(body.email).toBe(testDataUserUpdated.email);
			});
	});

	/**
	 * Test to check if a non-root user can update another user's data
	 */
	it('/api/user/{id} (PUT) - failed', () => {
		return request(app.getHttpServer())
			.put('/user/1')
			.set('Authorization', `Bearer ${newUserToken}`)
			.send(testDataUserUpdated)
			.expect(403);
	});

	/**
	 * User deletition test
	 */
	it('/api/user (DELETE) - success', () => {
		deleteDataRight.ids.push(newUserId);

		return request(app.getHttpServer())
			.delete('/user')
			.set('Authorization', `Bearer ${newUserToken}`)
			.send(deleteDataRight)
			.expect(204);
	});

	/**
	 * Test for the ability of a non-root user to delete another user's data
	 */
	it('/api/user (DELETE) - failes', () => {
		deleteDataFailed.ids.push(newUserId);

		return request(app.getHttpServer())
			.delete('/user')
			.set('Authorization', `Bearer ${newUserToken}`)
			.send(deleteDataFailed)
			.expect(403);
	});
});
