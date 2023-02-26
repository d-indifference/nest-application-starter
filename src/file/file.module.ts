import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerConfig } from '../multer-config';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		MulterModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: multerConfig
		})
	],
	controllers: [FileController]
})
export class FileModule {}
