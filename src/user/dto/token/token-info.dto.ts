import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../entities/user.entity';

/**
 * Данные, извлекаемые из токена авторизации
 */
export class TokenInfoDto {
	/**
	 * Данные, извлекаемые из токена авторизации
	 * @param id ID пользователя
	 * @param email Email
	 * @param role Роль пользователя
	 */
	constructor(id: number, email: string, role: UserRoles) {
		this.id = id;
		this.email = email;
		this.role = role;
	}

	/**
	 * ID пользователя
	 */
	@ApiProperty({ description: 'User ID', example: 123 })
	id: number;

	/**
	 * Email
	 */
	@ApiProperty({ description: 'User Email', example: 'john@doe.com' })
	email: string;

	/**
	 * Роль пользователя
	 */
	@ApiProperty({
		description: 'User roles',
		example: 'USER',
		enum: UserRoles,
		enumName: 'UserRoles'
	})
	role: UserRoles;
}
