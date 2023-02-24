import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../entities/user.entity';

/**
 * Информация для отображения карточки пользователя
 */
export class UserCardDto {
	/**
	 * Информация для отображения карточки пользователя
	 * @param id ID пользователя
	 * @param email Email
	 * @param name Имя пользователя
	 * @param role Роль
	 */
	constructor(id: number, email: string, name: string, role: UserRoles) {
		this.id = id;
		this.email = email;
		this.name = name;
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
	 * Имя пользователя
	 */
	@ApiProperty({ description: 'Username', example: 'John Doe' })
	name: string;

	/**
	 * Роль
	 */
	@ApiProperty({
		description: 'User role',
		example: UserRoles.USER,
		enum: UserRoles,
		enumName: 'UserRoles'
	})
	role: UserRoles;
}
