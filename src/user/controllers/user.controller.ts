import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Post,
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
import { CreationResultDto } from '../../utils/creation-result.dto';
import { DeleteDto } from '../../utils/delete.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { UserCardDto } from '../dto/user/user.card.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserItemDto } from '../dto/user/user.item.dto';
import { UserRolesDto } from '../dto/user/user.roles.dto';
import { UserUpdateDto } from '../dto/user/user.update.dto';
import { UserRoles } from '../entities/user.entity';
import { OnlyOwnerDeleteGuard } from '../guards/only-owner-delete.guard';
import { OnlyOwnerGetForUpdateGuard } from '../guards/only-owner-get-for-update.guard';
import { OnlyOwnerGuard } from '../guards/only-owner.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserService } from '../services/user.service';

/**
 * User controller
 */
@Controller('user')
@ApiTags('Working with users')
@ApiBearerAuth()
export class UserController {
	/**
	 * User controller
	 * @param userService User service
	 */
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(RolesGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Get User list'
	})
	@ApiResponse({
		type: [UserItemDto],
		description: 'User list',
		status: 200
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	public async index(): Promise<UserItemDto[]> {
		return await this.userService.findAll();
	}

	@Get('roles')
	@UseGuards(RolesGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Get user roles list'
	})
	@ApiResponse({
		type: UserRolesDto,
		description: 'User roles list',
		status: 200
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	public getRoles(): UserRolesDto {
		return this.userService.getRoles();
	}

	@Get(':id')
	@UseGuards(RolesGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Get user card by its ID'
	})
	@ApiResponse({
		type: UserCardDto,
		description: 'User card',
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
	@ApiResponse({
		status: 404,
		description: 'Not found'
	})
	public async getCard(@Param('id') id: number): Promise<UserCardDto> {
		if (!isNaN(Number(id))) {
			return await this.userService.findById(Number(id));
		}
		throw new BadRequestException();
	}

	@Get(':id/edit')
	@UseGuards(RolesGuard, OnlyOwnerGetForUpdateGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Get user update information'
	})
	@ApiResponse({
		type: UserUpdateDto,
		description: 'User update DTO',
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
	@ApiResponse({
		status: 404,
		description: 'Not found'
	})
	public async findForUpdate(
		@Param('id') id: number
	): Promise<UserUpdateDto> {
		if (!isNaN(Number(id))) {
			return await this.userService.findForUpdate(Number(id));
		}
		throw new BadRequestException();
	}

	@Post()
	@UseGuards(RolesGuard)
	@Roles(UserRoles.ROOT)
	@UsePipes(new ValidationPipe())
	@ApiOperation({
		summary: 'Create a superuser (for current superusers only)'
	})
	@ApiResponse({
		description: 'New superuser ID',
		status: 201,
		type: CreationResultDto
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request'
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	public async create(
		@Body() dto: UserCreateDto
	): Promise<CreationResultDto> {
		return new CreationResultDto(
			(await this.userService.create(dto, UserRoles.ROOT)).id
		);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe())
	@UseGuards(RolesGuard, OnlyOwnerGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'User update'
	})
	@ApiResponse({
		type: UserUpdateDto,
		description: 'Updated user`s ID',
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
	@ApiResponse({
		status: 404,
		description: 'Not found'
	})
	public async update(
		@Param('id') id: number,
		@Body() dto: UserUpdateDto
	): Promise<UserUpdateDto> {
		return await this.userService.update(id, dto);
	}

	@Delete()
	@HttpCode(204)
	@UsePipes(new ValidationPipe())
	@UseGuards(RolesGuard, OnlyOwnerDeleteGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Users` delete'
	})
	@ApiResponse({
		description: 'Users was deleted',
		status: 204
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request'
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden'
	})
	@ApiResponse({
		status: 404,
		description: 'Not found'
	})
	public async remove(@Body() dto: DeleteDto): Promise<void> {
		await this.userService.remove(dto);
	}
}
