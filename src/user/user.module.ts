import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repositories/user.repository';
import { PasswordService } from './services/password.service';
import { jwtConfig } from '../jwt-config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: jwtConfig
		}),
		TypeOrmModule.forFeature([User])
	],
	controllers: [AuthController, UserController],
	providers: [
		AuthService,
		UserService,
		UserMapper,
		UserRepository,
		PasswordService
	],
	exports: [JwtModule, UserRepository]
})
export class UserModule {}
