import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

/**
 * Токен авторизации
 */
export class TokenDto {
	/**
	 * Значение токена авторизации
	 */
	@ApiProperty({
		description: 'Bearer-token',
		// eslint-disable-next-line quotes
		example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
	})
	@IsString({ message: 'Should be string' })
	@IsNotEmpty({ message: 'Should`n be empty' })
	@IsJWT({ message: 'Should be JWT string' })
	token: string;
}
