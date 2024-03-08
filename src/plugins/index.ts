import { App } from 'vue';
import { initGlobal } from './global';
import { initInstall } from './install';

export const install = async (app: App) => {
    await initGlobal(app);
    await initInstall(app);
};
