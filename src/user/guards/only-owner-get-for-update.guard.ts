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
 * Checking if the user's update DTO has been received,
 * either by the user itself or by the root user
 */
@Injectable()
export class OnlyOwnerGetForUpdateGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const user = context.switchToHttp().getRequest()
			.user as UserRequestData;
		const url = context.switchToHttp().getRequest().url as string;
		const userIdFromRequest = Number(url.split('/').at(-2));

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
