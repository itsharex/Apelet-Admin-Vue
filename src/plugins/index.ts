import { App } from 'vue';
import { initGlobal } from './global';
import { initInstall } from './install';

export const install = (app: App) => {
	initGlobal(app);
	initInstall(app);
};
