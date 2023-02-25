import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * User entity repository
 */
@Injectable()
export class UserRepository extends Repository<User> {
	constructor(
		@InjectRepository(User)
		repository: Repository<User>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	/**
	 * Get all users
	 * @returns User list
	 */
	public async findAll(): Promise<User[]> {
		return await this.createQueryBuilder('user').getMany();
	}

	/**
	 * Delete users by its' IDs
	 * @param ids ID пользователей для удаления
	 */
	public async deleteByIds(ids: number[]): Promise<void> {
		await this.createQueryBuilder('user')
			.delete()
			.from(User)
			.whereInIds(ids)
			.execute();
	}

	/**
	 * Get User by email
	 * @param email Email
	 * @returns User
	 */
	public async findByEmail(email: string): Promise<User | undefined> {
		const entity = await this.createQueryBuilder('user')
			.where({ email })
			.getOne();

		if (entity) {
			return entity;
		}

		return undefined;
	}

	/**
	 * Get User by ID
	 * @param id User ID
	 * @returns User
	 */
	public async findById(id: number): Promise<User> {
		const entity = await this.createQueryBuilder('user')
			.where({ id })
			.getOne();

		return entity;
	}

	/**
	 * Get User by ID or throw 404 error
	 * @param id User ID
	 * @returns User
	 */
	public async findOneOr404(id: number): Promise<User> {
		const entity = await this.createQueryBuilder('user')
			.where({ id })
			.getOne();

		if (!entity) {
			throw new NotFoundException(`User with ID: ${id} was not found`);
		}

		return entity;
	}
}
