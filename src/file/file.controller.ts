import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
	UseGuards,
	HttpCode,
	Logger
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiTags,
	ApiOperation,
	ApiResponse
} from '@nestjs/swagger';
import { UserRoles } from '../user/entities/user.entity';
import { RolesGuard } from '../user/guards/roles.guard';
import { Roles } from '../user/decorators/roles-auth.decorator';

@Controller('file')
@ApiTags('Working with files')
@ApiBearerAuth()
export class FileController {
	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(RolesGuard)
	@Roles(UserRoles.USER, UserRoles.ROOT)
	@ApiOperation({
		summary: 'Upload a file'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiResponse({
		description: 'File has been uploaded',
		status: 200
	})
	public upload(
		@UploadedFile(
			'file',
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
					new FileTypeValidator({ fileType: 'image/png' })
				]
			})
		)
		file: Express.Multer.File
	): void {
		Logger.log(
			`File ${file.filename} was successfully uploaded`,
			this.constructor.name
		);
	}
}
