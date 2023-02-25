import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * User Update DTO
 */
export class UserUpdateDto {
	/**
	 * User Update DTO
	 * @param email Email
	 * @param password Password
	 * @param name Username
	 */
	constructor(email: string, password: string, name: string) {
		this.email = email;
		this.password = password;
		this.name = name;
	}

	/**
	 * Email
	 */
	@ApiProperty({ description: 'User email', example: 'john@doe.com' })
	@IsString({ message: 'Should be string' })
	@IsNotEmpty({ message: 'Shouldn`t be empty' })
	@IsEmail({}, { message: 'Should be email' })
	@MaxLength(200)
	email: string;

	/**
	 * Password
	 */
	@ApiProperty({
		description: 'User password',
		example: 'qwerty',
		maxLength: 200
	})
	@IsString({ message: 'Should be string' })
	@IsNotEmpty({ message: 'Shouldn`t be empty' })
	@MaxLength(200)
	password: string;

	/**
	 * Username
	 */
	@ApiProperty({
		description: 'Username',
		example: 'John Doe',
		maxLength: 300
	})
	@IsString({ message: 'Should be string' })
	@IsNotEmpty({ message: 'Shouldn`t be empty' })
	@MaxLength(300)
	name: string;
}
