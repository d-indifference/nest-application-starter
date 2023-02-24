import { ApiProperty } from '@nestjs/swagger';

/**
 * Данные пользоателя, полученные для вывода в списке
 */
export class UserItemDto {
	/**
	 * Данные пользоателя, полученные для вывода в списке
	 * @param id ID пользователя
	 * @param email Email
	 * @param name Имя пользователя
	 */
	constructor(id: number, email: string, name: string) {
		this.id = id;
		this.email = email;
		this.name = name;
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
}
