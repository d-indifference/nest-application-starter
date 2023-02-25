import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../entities/user.entity';

/**
 * DTO for list of available roles
 */
export class UserRolesDto {
	/**
	 * DTO for list of available roles
	 * @param roles List of received roles
	 */
	constructor(roles: string[]) {
		this.roles = roles;
	}

	/**
	 * List of received roles
	 */
	@ApiProperty({
		description: 'List of received roles',
		example: [UserRoles.ROOT, UserRoles.USER],
		isArray: true,
		type: [String]
	})
	roles: string[];
}
