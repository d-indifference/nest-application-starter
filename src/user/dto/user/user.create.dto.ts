import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * User Create DTO
 */
export class UserCreateDto {
	/**
	 * Email
	 */
	@ApiProperty({
		description: 'User email',
		example: 'john@doe.com',
		maxLength: 200
	})
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
