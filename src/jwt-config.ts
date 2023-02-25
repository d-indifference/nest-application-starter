import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * JWT Module configuration
 * @param configService Сервис конфигурации
 * @returns Опции JWT-модуля
 */
export const jwtConfig = (configService: ConfigService): JwtModuleOptions => {
	return {
		secret: configService.get<string>('PRIVATE_KEY') || 'SECRET',
		signOptions: {
			expiresIn: '48h'
		}
	};
};
