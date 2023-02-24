import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

/**
 * Данные для авторизации пользователя
 */
export class UserSignInDto {
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
	 * Пароль
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
}
