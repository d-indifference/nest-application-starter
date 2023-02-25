import { Injectable } from '@nestjs/common';
import { UserCardDto } from '../dto/user/user.card.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserItemDto } from '../dto/user/user.item.dto';
import { UserUpdateDto } from '../dto/user/user.update.dto';
import { User, UserRoles } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { PasswordService } from '../services/password.service';

/**
 * User entity mapper
 */
@Injectable()
export class UserMapper {
	/**
	 * User entity mapper
	 * @param passwordService Password service
	 * @param userRepository User repository
	 */
	constructor(
		private passwordService: PasswordService,
		private readonly userRepository: UserRepository
	) {}

	/**
	 * Entity to item DTO
	 * @param entity Entity
	 * @returns Item DTO
	 */
	public toItemDto(entity: User): UserItemDto {
		return new UserItemDto(entity.id, entity.email, entity.name);
	}

	/**
	 * Entity to card DTO
	 * @param entity Entity
	 * @returns Card DTO
	 */
	public toCardDto(entity: User): UserCardDto {
		return new UserCardDto(
			entity.id,
			entity.email,
			entity.name,
			entity.role
		);
	}

	/**
	 * Entity to update DTO
	 * @param entity Entity
	 * @returns Update DTO
	 */
	public toUpdateDto(entity: User): UserUpdateDto {
		return new UserUpdateDto(
			entity.email,
			this.passwordService.decrypt(entity.password),
			entity.name
		);
	}

	/**
	 * Creation DTO to entity
	 * @param dto Create DTO
	 * @param role User role
	 * @returns User with encrypted password
	 */
	public create(dto: UserCreateDto, role: UserRoles): User {
		return new User(
			dto.email,
			this.passwordService.encrypt(dto.password),
			dto.name,
			role
		);
	}

	/**
	 * Update DTO to entity
	 * @param dto Update DTO
	 * @param id Entity ID
	 * @returns User with encrypted password
	 */
	public async update(dto: UserUpdateDto, id: number): Promise<User> {
		const entity = await this.userRepository.findById(id);

		entity.email = dto.email;
		entity.password = this.passwordService.encrypt(dto.password);
		entity.name = dto.name;

		return entity;
	}
}
