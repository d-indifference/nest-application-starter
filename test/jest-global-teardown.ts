import { exec } from 'child_process';

/**
 * Исполнение консольной команды запуска миграции тестовой базы данных
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

/**
 * Настройки, производящиеся перед началом процесса тестирования
 */
const jestGlobalSetup = async () => {
	await promisifyProcess('npm run migration:revert-test');
};

export default jestGlobalSetup;
