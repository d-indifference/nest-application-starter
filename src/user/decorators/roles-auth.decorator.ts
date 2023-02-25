import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Roles for which an endpoint call is available
 * @param roles User roles
 * @returns void
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
