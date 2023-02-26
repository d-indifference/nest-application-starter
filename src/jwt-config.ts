import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * JWT Module configuration
 * @param configService Configuration service
 * @returns JWT Module options
 */
export const jwtConfig = (configService: ConfigService): JwtModuleOptions => {
	return {
		secret: configService.get<string>('PRIVATE_KEY') || 'SECRET',
		signOptions: {
			expiresIn: '48h'
		}
	};
};
