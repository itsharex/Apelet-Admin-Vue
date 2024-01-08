import type { App } from 'vue';

import hasPerms from './modules/hasPerms';
import hasRoles from './modules/hasRoles';

const directiveList = [hasPerms, hasRoles];

const directives = {
    install: function (app: App<Element>) {
        directiveList.forEach(direct => {
            app.directive(direct.name, direct.directive);
        });
    }
};

export default directives;
