import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceFactory } from './data-source-factory';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: dataSourceFactory
		}),
		UserModule,
		FileModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
