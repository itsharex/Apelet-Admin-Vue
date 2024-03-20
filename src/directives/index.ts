import type { App } from 'vue';
import { DirectiveOptions, Keys } from './interface';

const directModules = import.meta.glob('./modules/*.ts');

const directives = async (app: App<Element>) => {
    for (const key in directModules) {
        const direct = <importModules<DirectiveOptions<Keys>>>await directModules[key]();
        app.directive(direct.default.name, direct.default.directive);
    }
};
export default directives;
