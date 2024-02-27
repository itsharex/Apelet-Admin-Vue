import type { App } from 'vue';

import hasPerms from './modules/hasPerms';

const directiveList = [hasPerms];

const directives = {
    install: function (app: App<Element>) {
        directiveList.forEach(direct => {
            app.directive(direct.name, direct.directive);
        });
    }
};

export default directives;
