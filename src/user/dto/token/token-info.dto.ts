import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../entities/user.entity';

/**
 * Data retrieved from the authorization token
 */
export class TokenInfoDto {
	/**
	 * Data retrieved from the authorization token
	 * @param id User ID
	 * @param email Email
	 * @param role Role
	 */
	constructor(id: number, email: string, role: UserRoles) {
		this.id = id;
		this.email = email;
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
	 * Role
	 */
	@ApiProperty({
		description: 'User roles',
		example: 'USER',
		enum: UserRoles,
		enumName: 'UserRoles'
	})
	role: UserRoles;
}
