import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as uuid4 from 'uuid4';

export const multerConfig = (
	configService: ConfigService
): MulterModuleOptions => ({
	storage: diskStorage({
		destination(req, file, cb) {
			cb(
				null,
				path.resolve(process.cwd(), configService.get('FILE_STORAGE'))
			);
		},
		filename: (req, file, cb) => {
			cb(null, `${uuid4()}-${file.originalname}`);
		}
	})
});
