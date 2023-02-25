import { Injectable, Logger } from '@nestjs/common';
import { DeleteDto } from '../../utils/delete.dto';
import { UserCardDto } from '../dto/user/user.card.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserItemDto } from '../dto/user/user.item.dto';
import { UserRolesDto } from '../dto/user/user.roles.dto';
import { UserUpdateDto } from '../dto/user/user.update.dto';
import { UserRoles, User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../repositories/user.repository';

/**
 * User service
 */
@Injectable()
export class UserService {
	/**
	 * User service
	 * @param userRepository User repository
	 * @param userMapper User mapper
	 */
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userMapper: UserMapper
	) {}

	/**
	 * Getting a list of all available roles in the system
	 * @returns User available roles
	 */
	public getRoles(): UserRolesDto {
		Logger.log('getting roles', this.constructor.name);
		return new UserRolesDto(Object.values(UserRoles));
	}

	/**
	 * Get all users
	 * @returns User list DTO
	 */
	public async findAll(): Promise<UserItemDto[]> {
		Logger.log('finding all users', this.constructor.name);

		return (await this.userRepository.findAll()).map(
			this.userMapper.toItemDto
		);
	}

	/**
	 * Get user by its ID
	 * @param id User ID
	 * @returns User card
	 */
	public async findById(id: number): Promise<UserCardDto> {
		Logger.log(`finding user by id, id: ${id}`, this.constructor.name);

		return this.userMapper.toCardDto(
			await this.userRepository.findOneOr404(id)
		);
	}

	/**
	 * Get user by its ID for update
	 * @param id User ID
	 * @returns Update DTO
	 */
	public async findForUpdate(id: number): Promise<UserUpdateDto> {
		Logger.log(
			`finding user by id for update, id: ${id}`,
			this.constructor.name
		);

		return this.userMapper.toUpdateDto(
			await this.userRepository.findOneOr404(id)
		);
	}

	/**
	 * Get user by its email
	 * @param email User email
	 * @returns Found User
	 */
	public async findByEmail(email: string): Promise<User> {
		Logger.log(
			`finding user by email, email: ${email}`,
			this.constructor.name
		);

		return await this.userRepository.findByEmail(email);
	}

	/**
	 * Create a User
	 * @param dto User create DTO
	 * @param role User role
	 * @returns Created user
	 */
	public async create(dto: UserCreateDto, role: UserRoles): Promise<User> {
		Logger.log(
			`create user, email: ${dto.email}, name: ${dto.name}, role: ${role}`,
			this.constructor.name
		);

		return await this.userRepository.save(
			this.userMapper.create(dto, role)
		);
	}

	/**
	 * Update a User
	 * @param id User ID
	 * @param dto Update DTO
	 * @returns User update DTO with new information
	 */
	public async update(
		id: number,
		dto: UserUpdateDto
	): Promise<UserUpdateDto> {
		Logger.log(
			`update user, id: ${id}, email: ${dto.email}, name: ${dto.name}`,
			this.constructor.name
		);

		return this.userMapper.toUpdateDto(
			await this.userRepository.save(
				await this.userMapper.update(dto, id)
			)
		);
	}

	/**
	 * Delete users
	 * @param dto Users' IDs for deleting
	 */
	public async remove(dto: DeleteDto): Promise<void> {
		Logger.log(
			`delete users, ids: ${dto.ids.join(', ')}`,
			this.constructor.name
		);

		await this.userRepository.deleteByIds(dto.ids);
	}
}
