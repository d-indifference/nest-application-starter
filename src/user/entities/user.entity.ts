import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * User roles
 */
export enum UserRoles {
	/**
	 * Common user
	 */
	USER = 'USER',
	/**
	 * Superuser
	 */
	ROOT = 'ROOT'
}

/**
 * Entity - user
 */
@Entity('user', { schema: 'usr' })
export class User {
	/**
	 * Entity - user
	 * @param email Email
	 * @param password Password
	 * @param name Username
	 * @param role Role
	 */
	constructor(
		email: string,
		password: string,
		name: string,
		role?: UserRoles
	) {
		this.email = email;
		this.password = password;
		this.name = name;

		if (role) {
			this.role = role;
		}
	}

	/**
	 * User ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Email
	 */
	@Column({ type: 'varchar', length: 200 })
	email: string;

	/**
	 * Password
	 */
	@Column({ type: 'varchar', length: 200 })
	password: string;

	/**
	 * Role
	 */
	@Column({ type: 'varchar', length: 32 })
	role: UserRoles;

	/**
	 * Username
	 */
	@Column({ type: 'varchar', length: 300 })
	name: string;
}
