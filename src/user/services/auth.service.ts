import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto/token/token.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserSignInDto } from '../dto/user/user.sign-in.dto';
import { User, UserRoles } from '../entities/user.entity';
import { PasswordService } from './password.service';
import { UserService } from './user.service';

/**
 * User authentication service
 */
@Injectable()
export class AuthService {
	/**
	 * User authentication service
	 * @param userService User service
	 * @param jwtService JWT Service
	 * @param passwordService Password Service
	 */
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly passwordService: PasswordService
	) {}

	/**
	 * User authorization
	 * @param dto Sign in DTO
	 * @returns Bearer Token
	 */
	public async login(dto: UserSignInDto): Promise<TokenDto> {
		Logger.log(
			`login, dto: {email: ${dto.email}, password: ${dto.password}}`,
			this.constructor.name
		);
		return this.generateToken(await this.validateUser(dto));
	}

	/**
	 * User registration
	 * @param dto Creation DTO
	 * @returns Bearer Token
	 */
	public async register(dto: UserCreateDto): Promise<TokenDto> {
		const user = await this.userService.create(dto, UserRoles.USER);

		Logger.log(
			`registered user, id: ${user.id}, role: ${user.role}`,
			this.constructor.name
		);

		return this.generateToken(user);
	}

	/**
	 * Authorization token generation based on the User entity
	 * @param user User
	 * @returns Bearer token DTO
	 */
	private generateToken(user: User): TokenDto {
		Logger.log(
			`token generation, id: ${user.id}, role: ${user.role}, ${user.email}`,
			this.constructor.name
		);

		return {
			token: this.jwtService.sign({
				email: user.email,
				id: user.id,
				role: user.role
			})
		};
	}

	/**
	 * Checking the correctness of the entered authorization data
	 * @param dto Sign in DTO
	 * @returns Found User entity
	 */
	private async validateUser(dto: UserSignInDto): Promise<User> {
		const user = await this.userService.findByEmail(dto.email);

		if (!user) {
			throw new UnauthorizedException('Bad credentials');
		}

		if (
			this.passwordService.decrypt(user.password) === dto.password &&
			user.email === dto.email
		) {
			if (user.email === dto.email) {
				return user;
			}
		} else {
			throw new UnauthorizedException('Bad credentials');
		}
	}
}
