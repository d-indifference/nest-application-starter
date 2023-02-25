import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '../decorators/roles-auth.decorator';
import { TokenInfoDto } from '../dto/token/token-info.dto';
import { TokenDto } from '../dto/token/token.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserSignInDto } from '../dto/user/user.sign-in.dto';
import { UserRoles } from '../entities/user.entity';
import { RolesGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';

/**
 * User authentication controller
 */
@Controller('user/auth')
@ApiTags('User authentification')
@ApiBearerAuth()
export class AuthController {
	/**
	 * User authentication controller
	 * @param authService User authentication service
	 */
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@ApiOperation({
		summary: 'User`s sign in'
	})
	@ApiResponse({
		type: TokenDto,
		description: 'Bearer token',
		status: 200
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request'
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized'
	})
	public async login(@Body() dto: UserSignInDto): Promise<TokenDto> {
		return await this.authService.login(dto);
	}

	@Post('/registration')
	@UsePipes(new ValidationPipe())
	@ApiOperation({
		summary: 'User`s sign up'
	})
	@ApiResponse({
		type: TokenDto,
		description: 'Bearer token',
		status: 201
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request'
	})
	public async registration(@Body() dto: UserCreateDto): Promise<TokenDto> {
		return await this.authService.register(dto);
	}

	@Post('/whois')
	@HttpCode(200)
	@UseGuards(RolesGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@UsePipes(new ValidationPipe())
	@ApiOperation({
		summary: 'Information about current user'
	})
	@ApiResponse({
		type: TokenInfoDto,
		description: 'Bearer token',
		status: 200
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request'
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	public whois(@Req() request: Request): TokenInfoDto {
		return new TokenInfoDto(
			request['user'].id,
			request['user'].email,
			request['user'].role
		);
	}
}
