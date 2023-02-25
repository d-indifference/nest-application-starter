import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../entities/user.entity';

/**
 * User card DTO
 */
export class UserCardDto {
	/**
	 * User card DTO
	 * @param id User ID
	 * @param email Email
	 * @param name Username
	 * @param role Role
	 */
	constructor(id: number, email: string, name: string, role: UserRoles) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.role = role;
	}

	/**
	 * User ID
	 */
	@ApiProperty({ description: 'User ID', example: 123 })
	id: number;

	/**
	 * Email
	 */
	@ApiProperty({ description: 'User Email', example: 'john@doe.com' })
	email: string;

	/**
	 * Username
	 */
	@ApiProperty({ description: 'Username', example: 'John Doe' })
	name: string;

	/**
	 * Role
	 */
	@ApiProperty({
		description: 'User role',
		example: UserRoles.USER,
		enum: UserRoles,
		enumName: 'UserRoles'
	})
	role: UserRoles;
}
