import { exec } from 'child_process';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Console command execution
 * @returns Promise-объект
 */
const promisifyProcess = (command: string): Promise<void> =>
	new Promise((resolve, reject) => {
		exec(command, err => {
			if (err) {
				reject(err);
			} else {
				resolve(null);
			}
		});
	});

const jestGlobalSetup = async () => {
	const cwd = process.cwd();

	config({ path: path.resolve(cwd, '.env.test') });

	fs.unlinkSync(path.resolve(cwd, process.env.FILE_STORAGE));

	await promisifyProcess('npm run migration:revert-test');
};

export default jestGlobalSetup;
