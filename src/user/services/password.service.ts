import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

/**
 * Service for working with user password
 */
@Injectable()
export class PasswordService {
	/**
	 * Service for working with user password
	 * @param configService Config service
	 */
	constructor(private readonly configService: ConfigService) {}

	/**
	 * Password encryption
	 * @param password Password
	 * @returns Encrypted password
	 */
	public encrypt(password: string): string {
		return CryptoJS.AES.encrypt(
			password,
			this.configService.get<string>('PRIVATE_KEY')
		).toString();
	}

	/**
	 * Password decryption
	 * @param encryptedPassword Encrypted password
	 * @returns Decrypted password
	 */
	public decrypt(encryptedPassword: string): string {
		const bytes = CryptoJS.AES.decrypt(
			encryptedPassword,
			this.configService.get<string>('PRIVATE_KEY')
		);

		return bytes.toString(CryptoJS.enc.Utf8);
	}
}
