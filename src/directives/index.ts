import type { App } from 'vue';

import hasPerms from './modules/hasPerms';
import hasRole from './modules/hasRole';

const directiveList = [hasPerms, hasRole];

const directives = {
    install: function (app: App<Element>) {
        directiveList.forEach(direct => {
            app.directive(direct.name, direct.directive);
        });
    }
};

export default directives;
