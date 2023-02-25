import { exec } from 'child_process';

/**
 * Console command execution
 * @returns Promise
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
	await promisifyProcess('npm run migration:run-test');
};

export default jestGlobalSetup;
