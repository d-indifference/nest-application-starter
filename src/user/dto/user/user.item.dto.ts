import { ApiProperty } from '@nestjs/swagger';

/**
 * User Item DTO
 */
export class UserItemDto {
	/**
	 * User Item DTO
	 * @param id User ID
	 * @param email Email
	 * @param name Username
	 */
	constructor(id: number, email: string, name: string) {
		this.id = id;
		this.email = email;
		this.name = name;
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
}
