import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from '../entities/user.entity';
import { UserRequestData } from '../types';

/**
 * Checking for an operation with the user entity either by the user himself or by the root user
 */
@Injectable()
export class OnlyOwnerGuard implements CanActivate {
	/**
	 * Возвращаемое значение указывает,
	 * разрешено ли выполнение текущего запроса.
	 * Возврат может быть либо синхронным (`boolean`),
	 * или асинхронный ("Promise" или "Observable")
	 * @param context Текущий контекст выполнения
	 * @returns Разрешить или отказать в выполнении запроса
	 */
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const user = context.switchToHttp().getRequest()
			.user as UserRequestData;

		const url = context.switchToHttp().getRequest().url as string;
		const userIdFromRequest = Number(url.split('/').at(-1));

		if (user.role !== UserRoles.ROOT) {
			if (user.id !== userIdFromRequest) {
				throw new ForbiddenException(
					'You don`t have permissions for this operation'
				);
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}
